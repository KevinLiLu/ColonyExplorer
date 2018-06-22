import getNetworkClient from '../utils/colonyNetworkClient';
// import { findOne } from '../utils/mongoUtils';
import { getTokenInfo } from '../utils/tokenUtils';

import moment from 'moment';


module.exports.fetchAddressFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();
  let id = req.params.id
//   let parsedId = parseInt(id)
//   console.log('this is req.params.id', parsedId);
//   console.log( typeof req.params.pageId );
  let address = (await networkClient.getColonyAddress(parseInt(id)));
    // .then(result => { console.log(result) }
    // .catch(error => { ··· });

  // let address1 = (await networkClient.getColony.call({ id }).address);
  console.log('this is address', address)
  res.send({
    address
  });

}


module.exports.fetchDomainFromEth = async function(req, res) {
  console.log('this is a test')
  let networkClient = await getNetworkClient();
  let id = req.params.id
  console.log(req.params)

  let colonyClient = (await networkClient.getColonyClient(parseInt(id)));

  let totalDomainCount = (await colonyClient.getDomainCount.call()).count;
  console.log(networkClient.getDomainCount)
  res.send({
    totalDomainCount
  });
};

// module.exports.fetchTokenfromEth = async function(req, res) {
//   let networkClient = await getNetworkClient();
//   let id = req.params.id
//   console.log(req.params)

//   let colonyClient = (await networkClient.getColonyClient(parseInt(id)));
//   let token = (await colonyClient.getTokenInfo(id)).count;
//   console.log(token)

//   res.send({
//     token
//   });
// };


module.exports.fetchTaskFromEth = async function(req, res) {
  let networkClient = await getNetworkClient();
  let id = req.params.id
  console.log("this is req.params.id", req.params)

  let colonyClient = (await networkClient.getColonyClient(parseInt(id)));
  let task = (await colonyClient.getTaskCount.call()).count;
  console.log('this is a task', task)

  res.send({
    task
  });
};

// module.exports.fetchRewardPotFromEth = async function(req, res) {
//   let networkClient = await getNetworkClient();

//   // let totalRewardPot = (await networkClient.getPotBalance.call({ potId , source }))

//   res.send({
//     // totalRewardPot
//   });
// };

// module.exports.fetchNonRewardPotfromEth = async function(req, res){
//   let networkClient = await getNetworkClient();

//   // let totalNonRewardPot = (await networkClient.getNonRewardPotsTotal.call({ source }))

//   res.send({
//     // totalNonRewardPot
//   });
// };


