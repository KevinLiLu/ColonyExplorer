import { findOne } from '../utils/mongoUtils';
import moment from 'moment';

let NUM_DAYS_LOOK_BACK = 7;

/*
* Helper method to query Mongo for a specific time window of time-series
* data from Mongo to plot in the main home page graphs.
*/
module.exports.getTimeSeriesData = async function(req, res) {
  // Generate list of dates to fetch
  let name = req.params.name;
  let currentDate = moment();
  let fields = {};
  for (var i = 0; i < NUM_DAYS_LOOK_BACK; i++) {
    fields[currentDate.format('MMDDYY')] = 1;
    currentDate.subtract(1, 'days');
  }

  // Get MongoDB document and return data for specified dates
  const doc = await findOne('time-series-data', { name }, fields, '');
  const data = convertObjectToKeyValueSeparatedLists(doc, 'labels', 'data');
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
