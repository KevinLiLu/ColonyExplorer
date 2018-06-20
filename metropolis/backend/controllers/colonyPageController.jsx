import getNetworkClient from '../utils/colonyNetworkClient';
import { findOne } from '../utils/mongoUtils';
import moment from 'moment';


module.exports.fetchAddressFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  let address = (await networkClient.getColonyAddress(id));

  res.send({
    address
  });

};

module.exports.fetchTokenfromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  let token = (await networkClient.getToken.call());

  res.send({
    token
  });
}

module.exports.fetchDomainFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  let totalDomainCount = (await networkClient.getDomainCount.call()).count;

  res.send({
    totalDomainCount
  });
};

module.exports.fetchTaskFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  let totalTaskCount = (await networkClient.getTaskCount.call()).count;

  res.send({
    totalTaskCount
  });

};

module.exports.fetchRewardPotFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  let totalRewardPot = (await networkClient.getPotBalance.call({ potId , source }))

  res.send({
    totalRewardPot
  });
};

module.exports.fetchNonRewardPotfromEth = async function(req, res){
  let networkClient = await getNetworkClient();

  let totalNonRewardPot = (await networkClient.getNonRewardPotsTotal.call({ source }))

  res.send({
    totalNonRewardPot
  });
};


