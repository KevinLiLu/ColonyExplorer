const { default: ColonyNetworkClient } = require('@colony/colony-js-client');
const moment = require('moment');

const createAdapter = require('./etherAdapter');
const { findOne, updateOne } = require('./mongoDAO');

// general-store collection names
const COLLECTION_STATISTICS = 'statistics';
const COLLECTION_INSPECTOR_METADATA = 'colony-inspector-metadata';
const COLLECTION_TIME_SERIES_DATA = 'time-series-data';

// general-store data keys
const KEY_TOTAL_DOMAIN_COUNT = 'total-domain-count';
const KEY_TOTAL_TASK_COUNT = 'total-task-count';
const KEY_TOTAL_COLONY_COUNT = 'total-colony-count';

/*
* Returns the snapshot date saved in general-store.
*
* See the README for a detailed description of the snapshot date.
*/
getSnapshotDate = async () => {
  const snapshotDate = await findOne(COLLECTION_INSPECTOR_METADATA, {'name': 'colony-inspector-metadata'}, {'snapshot-date': 1}, '');
  return snapshotDate['snapshot-date'];
}

/*
* Sets the snapshot date saved in general-store.
*
* See the README for a detailed description of the snapshot date.
*/
setSnapshotDate = async (newSnapshotDate) => {
  await updateOne(COLLECTION_INSPECTOR_METADATA, {'name': 'colony-inspector-metadata'}, {'snapshot-date': newSnapshotDate});
}

/*
* Sets a time series data point in general-store.
*/
setTimeSeriesData = async (name, timestamp, value) => {
  await updateOne(COLLECTION_TIME_SERIES_DATA, {'name': name}, {[timestamp]: value});
}

/*
* Run one iteration of crawling to calculate and save statistics to general-store.
*/
runOnce = async () => {
  // TODO: remove this log
  console.log(`Running loop at ${moment().format()}`);
  // Connect to ColonyNetwork using adapter
  const adapter = await createAdapter(0);
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // TODO: remove these statements since they are instantaneous and we do not need to save these to general-store
  const totalColonyCount = (await networkClient.getColonyCount.call()).count;
  const totalSkillCount = (await networkClient.getSkillCount.call()).count;

  // Crawl all the colonies to calculate statistics
  var totalDomainCount = 0, totalTaskCount = 0;

  for (i = 1; i < totalColonyCount + 1; i++) {
    const colonyClient = await networkClient.getColonyClient(i);

    // Save relevant calculated data
    const domainCount = (await colonyClient.getDomainCount.call()).count;
    totalDomainCount += domainCount;
    const taskCount = (await colonyClient.getTaskCount.call()).count;
    totalTaskCount += taskCount;

    // [ADVANCED] TODO: Pot balances
  }

  console.log(`Total domain count: ${totalDomainCount}, total task count: ${totalTaskCount}`);

  // Save statistics to general-store
  await updateOne(COLLECTION_STATISTICS, {'name':'statistics'}, {[KEY_TOTAL_DOMAIN_COUNT]: totalDomainCount});
  await updateOne(COLLECTION_STATISTICS, {'name':'statistics'}, {[KEY_TOTAL_TASK_COUNT]: totalTaskCount});

  // Get snapshot date and see if we need to save a new time-series data point
  // We save a new time-series data point when it becomes the next date (when
  // current date is not equal to snapshot date)
  const snapshotDate = await getSnapshotDate();
  const currentDate = moment().format('MMDDYY');
  if (snapshotDate != currentDate) {
    console.log(`snapshotDate ${snapshotDate} different than currentDate ${currentDate}!`);
    // Update time-series data
    await setTimeSeriesData(KEY_TOTAL_COLONY_COUNT, currentDate, totalColonyCount);
    await setTimeSeriesData(KEY_TOTAL_TASK_COUNT, currentDate, totalTaskCount);

    // Set new snapshot date
    await setSnapshotDate(currentDate);
  }
};

setInterval(runOnce, 60000);
