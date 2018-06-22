import getNetworkClient from '../utils/colonyNetworkClient';

const PAGE_SIZE = 10;

/*
* Retrieves a page of domains to render the Domains view.
*/
module.exports.getPageOfDomains = async function(req, res) {
  try {
    res.send({});
  } catch (err) {
    res.send({ error: err.message });
  }
};

/*
* Controller method to retrieve domain details from ethereum network for domains
* between startId and endId for a given colonyId.
*/
module.exports.getDomainsFromEthNetwork = async function(req, res) {
  let response = {
    domains: [],
  };

  try {
    const { colonyId, startId, endId } = req.params;
    let networkClient = await getNetworkClient();
    let colonyClient = await networkClient.getColonyClient(parseInt(colonyId));
    let totalDomainCount = (await colonyClient.getDomainCount.call()).count;

    for (var domainId = parseInt(startId); domainId < parseInt(endId) + 1 && domainId < totalDomainCount + 1; domainId++) {
      let domain = await colonyClient.getDomain.call({ domainId });
      response.domains.push(domain);
    }
  } catch (error) {
    response.error = error.message;
  };

  res.send(response);
};
