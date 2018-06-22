import getNetworkClient from '../utils/colonyNetworkClient';

/*
* Controller method to retrieve a domain's details from ethereum network.
*/
module.exports.getDomainDetailsFromEthNetwork = async function(req, res) {
  let response = {
    fields: [],
  };

  try {
    const { colonyId, domainId } = req.params;
    let networkClient = await getNetworkClient();
    let colonyClient = await networkClient.getColonyClient(parseInt(colonyId));
    let domain = await colonyClient.getDomain.call({ domainId: parseInt(domainId) });

    for(var key in domain) {
      if(domain.hasOwnProperty(key)) {
        response.fields.push([key, domain[key]]);
      }
    }

    response.fields.push(['colonyId', colonyId]);
  } catch (error) {
    response.error = error.message;
  };

  res.send(response);
};
