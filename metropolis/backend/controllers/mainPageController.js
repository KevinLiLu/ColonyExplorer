import { findOne } from '../utils/mongoUtils';
import moment from 'moment';

import getNetworkClient from '../utils/colonyNetworkClient';

let NUM_DAYS_LOOK_BACK = 7;

/*
* Queries MongoDB to fetch statistics about the Colony Network to render
* on the main home page.
*
* The following data fields are retrieved:
*     - totalDomainCount
*     - totalTaskCount
*     - time-series-data for totalColonyCount, totalTaskCount,
* totalDomainCount, and totalSkillCount
*
*/
module.exports.fetchStatisticsFromMongo = async function(req, res) {
  let data = {};

  // 'statistics' data in MongoDB
  const statisticsData = await findOne('statistics', {name: 'statistics'}, {}, '');

  const totalDomainCount = statisticsData['total-domain-count'];
  const totalTaskCount = statisticsData['total-task-count'];

  data['statistics'] = {
    totalDomainCount,
    totalTaskCount,
  };

  // time-series data
  data['time-series-data'] = {};
  let timeSeriesData = data['time-series-data'];
  timeSeriesData['total-colony-count'] = await getTimeSeriesData('total-colony-count', NUM_DAYS_LOOK_BACK);
  timeSeriesData['total-task-count'] = await getTimeSeriesData('total-task-count', NUM_DAYS_LOOK_BACK);
  timeSeriesData['total-domain-count'] = await getTimeSeriesData('total-domain-count', NUM_DAYS_LOOK_BACK);
  timeSeriesData['total-skill-count'] = await getTimeSeriesData('total-skill-count', NUM_DAYS_LOOK_BACK);

  res.send(data);
}

/*
* Helper method to query Mongo for a specific time window of time-series
* data from Mongo to plot in the main home page graphs.
*/
async function getTimeSeriesData(name, numDaysToLookBack) {
  // Generate list of dates to fetch
  let currentDate = moment();
  let fields = {};
  for (var i = 0; i < numDaysToLookBack; i++) {
    fields[currentDate.format('MMDDYY')] = 1;
    currentDate.subtract(1, 'days');
  }

  // Get MongoDB document and return data for specified dates
  const doc = await findOne('time-series-data', { name }, fields, '');

  return doc;
}

/*
* Fetches Colony Network statistics directly from the Ethereum network
* by using the ColonyNetworkClient and NetworkLoader.
*
* The following data fields are retrieved:
*     - totalColonyCount
*     - totalSkillCount
*
*/
module.exports.fetchStatisticsFromEthereum = async function(req, res) {
  let networkClient = await getNetworkClient();

  let totalColonyCount = (await networkClient.getColonyCount.call()).count;
  let totalSkillCount = (await networkClient.getSkillCount.call()).count;

  res.send({
    totalColonyCount,
    totalSkillCount,
  });
}
