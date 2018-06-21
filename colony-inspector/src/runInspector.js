const moment = require('moment');

const getColonyNetworkClient = require('./utils/ColonyNetworkClient');
const { findOne, updateOne } = require('./utils/mongoUtils');
const { getSnapshotDate, setSnapshotDate } = require('./utils/snapshotUtils');
const getTokenInfo = require('./utils/tokenUtils');

// general-store collection names
const COLLECTION_STATISTICS = 'statistics';
const COLLECTION_TIME_SERIES_DATA = 'time-series-data';
const COLLECTION_INSPECTOR_METADATA = 'colony-inspector-metadata';
const COLLECTION_COLONIES = 'colonies';

// general-store data keys
const KEY_TOTAL_DOMAIN_COUNT = 'total-domain-count';
const KEY_TOTAL_TASK_COUNT = 'total-task-count';
const KEY_TOTAL_COLONY_COUNT = 'total-colony-count';
const KEY_TOTAL_SKILL_COUNT = 'total-skill-count';

/*
* Saves a time series data point in general-store.
*/
saveTimeSeriesData = async (name, timestamp, value) => {
  await updateOne(COLLECTION_TIME_SERIES_DATA, {'name': name}, {[timestamp]: value}, false);
}

/*
* Saves colony data (colony id, token name, token symbol) into colonies collection.
*/
updateColoniesCollection = async (networkClient, totalColonyCount) => {
  // 1. First get previous totalColonyCount from colony-inspector-metadata
  const prevTotalColonyCount = (await findOne(COLLECTION_INSPECTOR_METADATA, {'name': 'colony-inspector-metadata'}, {totalColonyCount: 1}, '')).totalColonyCount;

  let count = 0;

  // 2. For each missing colony, upsert the colony data to Mongo
  for (var i = prevTotalColonyCount + 1; i < totalColonyCount + 1; i++) {
    // a. Get token info
    const { name, symbol, decimals } = await getTokenInfo(i);
    // b. Get address
    const address = await networkClient.getColonyAddress(parseInt(i));

    const doc = {
      name,
      symbol,
      decimals,
      id: i,
      address,
    };

    // c. Save data to mongo and update totalColonyCount in colony-inspector-metadata
    await updateOne(COLLECTION_COLONIES, {id: i}, doc, true);
    await updateOne(COLLECTION_INSPECTOR_METADATA, {name: 'colony-inspector-metadata'}, {totalColonyCount: i}, true);
    count ++;
  }
  console.log(`Done updating ${count} colonies collection!`);
};


fetchAndSaveColonyData = async (networkClient, totalColonyCount) => {
  // Crawl all the colonies to calculate statistics
  var totalDomainCount = 0, totalTaskCount = 0;

  for (id = 1; id < totalColonyCount + 1; id++) {
    const colonyClient = await networkClient.getColonyClient(id);

    // Save relevant calculated data
    const domainCount = (await colonyClient.getDomainCount.call()).count;
    totalDomainCount += domainCount;
    const taskCount = (await colonyClient.getTaskCount.call()).count;
    totalTaskCount += taskCount;

    // [ADVANCED] TODO: Pot balances
  }

  console.log(`total-domain-count: ${totalDomainCount}, total-task-count: ${totalTaskCount}, total-colony-count: ${totalColonyCount}`);

  // Save statistics to general-store
  updateOne(COLLECTION_STATISTICS, {'name':'statistics'}, {[KEY_TOTAL_DOMAIN_COUNT]: totalDomainCount}, false);
  updateOne(COLLECTION_STATISTICS, {'name':'statistics'}, {[KEY_TOTAL_TASK_COUNT]: totalTaskCount}, false);

  return {
    totalDomainCount,
    totalTaskCount,
  }
};

saveTimeSeriesDataIfNextDay = async (totalColonyCount, totalTaskCount, totalDomainCount, totalSkillCount) => {
  // Get snapshot date and see if we need to save a new time-series data point
  // We save a new time-series data point when it becomes the next date (when
  // current date is not equal to snapshot date)
  const snapshotDate = await getSnapshotDate();
  const currentDate = moment().format('MMDDYY');
  if (snapshotDate != currentDate) {
    console.log(`snapshotDate ${snapshotDate} different than currentDate ${currentDate}!`);
    // Update time-series data
    await saveTimeSeriesData(KEY_TOTAL_COLONY_COUNT, currentDate, totalColonyCount);
    await saveTimeSeriesData(KEY_TOTAL_TASK_COUNT, currentDate, totalTaskCount);
    await saveTimeSeriesData(KEY_TOTAL_DOMAIN_COUNT, currentDate, totalDomainCount);
    await saveTimeSeriesData(KEY_TOTAL_SKILL_COUNT, currentDate, totalSkillCount);

    // Set new snapshot date
    await setSnapshotDate(currentDate);
  }
}

/*
* Run one iteration of crawling to calculate and save statistics to general-store.
*/
runOnce = async () => {
  console.log(`Running loop at ${moment().format()}`);

  const networkClient = await getColonyNetworkClient();

  // TODO: remove these statements since they are instantaneous and we do not need to save these to general-store
  const totalColonyCount = (await networkClient.getColonyCount.call()).count;
  const totalSkillCount = (await networkClient.getSkillCount.call()).count;

  // Update colonies collection
  updateColoniesCollection(networkClient, totalColonyCount);

  // Update and calculate colony statistics
  const { totalDomainCount, totalTaskCount } = await fetchAndSaveColonyData(networkClient, totalColonyCount);

  saveTimeSeriesDataIfNextDay(totalColonyCount, totalTaskCount, totalDomainCount, totalSkillCount);
};

setInterval(runOnce, 60000);
