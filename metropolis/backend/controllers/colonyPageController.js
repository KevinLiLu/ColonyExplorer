import getNetworkClient from '../utils/colonyNetworkClient';
import { getTokenInfo } from '../utils/tokenUtils';

import moment from 'moment';


module.exports.fetchAddressFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();
  let id = req.params.id
  let address = (await networkClient.getColonyAddress(parseInt(id)));
  res.send({
    address
  });
}


module.exports.fetchDomainFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();
  let id = req.params.id

  let colonyClient = (await networkClient.getColonyClient(parseInt(id)));

  let totalDomainCount = (await colonyClient.getDomainCount.call()).count;
  res.send({
    totalDomainCount
  });
};

module.exports.fetchTaskFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();
  let id = req.params.id

  let colonyClient = (await networkClient.getColonyClient(parseInt(id)));
  let task = (await colonyClient.getTaskCount.call()).count;

  res.send({
    task
  });
};
