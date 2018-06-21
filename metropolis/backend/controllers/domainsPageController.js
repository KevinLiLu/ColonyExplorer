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
