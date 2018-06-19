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
*/
module.exports.fetchStatisticsFromMongo = async function(req, res) {
  // 'statistics' data in MongoDB
  const statisticsData = await findOne('statistics', {name: 'statistics'}, {}, '');

  const totalDomainCount = statisticsData['total-domain-count'];
  const totalTaskCount = statisticsData['total-task-count'];

  let data = {
    totalDomainCount,
    totalTaskCount,
  };

  res.send(data);
};

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
};

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
};

/*
* Retrieves the time-series-data from Mongo to render the graphs on the main page.
*
* The following time series data are retrieved:
*     - totalColonyCount
*     - totalTaskCount
*     - totalDomainCount
*     - totalSkillCount
*/
module.exports.fetchTimeSeriesData = async function(req, res) {
  let data = {};

  let totalColonyCountDoc = await getTimeSeriesData('total-colony-count', NUM_DAYS_LOOK_BACK);
  data['totalColonyCount'] = convertObjectToKeyValueSeparatedLists(totalColonyCountDoc, 'labels', 'data');

  let totalTaskCountDoc = await getTimeSeriesData('total-task-count', NUM_DAYS_LOOK_BACK);
  data['totalTaskCount'] = convertObjectToKeyValueSeparatedLists(totalTaskCountDoc, 'labels', 'data');

  let totalDomainCountDoc = await getTimeSeriesData('total-domain-count', NUM_DAYS_LOOK_BACK);
  data['totalDomainCount'] = convertObjectToKeyValueSeparatedLists(totalDomainCountDoc, 'labels', 'data');

  let totalSkillCountDoc = await getTimeSeriesData('total-skill-count', NUM_DAYS_LOOK_BACK);
  data['totalSkillCount'] = convertObjectToKeyValueSeparatedLists(totalSkillCountDoc, 'labels', 'data');

  res.send(data);
};

/*
* Helper method that takes the raw time-series-data document from MongoDB and
* converts it into a format that the front-end React can read and directly pass
* it to the graphing framework.
*
* Format for each separate graph:
*     - labels: [List of X-axis values]
*     - data: [List of Y-axis values]
*/
function convertObjectToKeyValueSeparatedLists(obj, firstKey, secondKey) {
  let output = {
    [firstKey]: [],
    [secondKey]: []
  };

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      output[firstKey].push(key);
      output[secondKey].push(obj[key]);
    }
  }

  return output;
}
