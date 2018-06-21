import getNetworkClient from '../utils/colonyNetworkClient';
// import { findOne } from '../utils/mongoUtils';
import moment from 'moment';


// module.exports.fetchAddressFromEth = async function(req, res) {
//   let networkClient = await getNetworkClient();
//   let id = req.params.id
// //   let parsedId = parseInt(id)
// //   console.log('this is req.params.id', parsedId);
// //   console.log( typeof req.params.pageId );
//   let address = (await networkClient.getColonyAddress({id}));
//     // .then(result => { console.log(result) }
//     // .catch(error => { ··· });

//   // let address1 = (await networkClient.getColony.call({ id }).address);
//   console.log('this is address', address)
//   res.send(
//     address
//   );

// }

module.exports.fetchTokenfromEth = async function(req, res) {
  let networkClient = await getNetworkClient();

  // let token = (await networkClient.getToken.call());
  // console.log(token)
  res.send({
    token
  });
}

// module.exports.fetchDomainFromEth = async function(req, res) {
//   console.log('this is a test')
//   let networkClient = await getNetworkClient();

//   let totalDomainCount = (await networkClient.getDomainCount.call());
//   console.log(networkClient.getDomainCount)
//   res.send({
//     totalDomainCount
//   });
// };

// module.exports.fetchTaskFromEth = async function(req, res) {
//   let networkClient = await getNetworkClient();

//   let totalTaskCount = (await networkClient.getTaskCount.call());

//   res.send({
//     totalTaskCount
//   });

// };

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


