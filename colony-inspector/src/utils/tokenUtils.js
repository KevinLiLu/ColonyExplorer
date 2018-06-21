const getColonyNetworkClient = require('./ColonyNetworkClient');

/*
* Retrieves a token's information given a colony id.
*
* Token data retrieved:
*     - name
*     - symbol
*     - decimals
*/
module.exports = async function getTokenInfo(colonyId) {
  let data = {};

  try {
    let networkClient = await getColonyNetworkClient();
    let colonyClient = await networkClient.getColonyClient(parseInt(colonyId));
    let tokenInfo = await colonyClient.token.getTokenInfo.call();
    data = tokenInfo;
  } catch (error) {
    let errorMessage = error.message;
    // Specified colony id does not exist
    if (errorMessage.includes('could not be found')) {
      data['error'] = `Colony with ID ${colonyId} could not be found.`;
    }
    // Specified token does not have name/symbol/decimals
    else if (errorMessage.includes('call exception') && errorMessage.includes('value=[]')) {
      data = {
        name: 'null',
        symbol: 'null',
        decimals: 'null',
      }
    }
    // Some other fatal or unknown error
    else {
      data['error'] = error.message;
    }
   }

   return data;
}
