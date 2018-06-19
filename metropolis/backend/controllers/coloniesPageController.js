import getNetworkClient from '../utils/colonyNetworkClient';
import { findOne } from '../utils/mongoUtils';

let PAGE_SIZE = 10;

/*
* Retrieves a page of colonies to render the Colonies view.
*
* We save the first page of colonies to provide a faster lookup since
* most people will view the first page (and not proceeed to the nex ones).
*
*/
module.exports.getPageOfColonies = async function(req, res) {
  try {
    let networkClient = await getNetworkClient();

    let pageId = req.params.pageId || 1;
    let startId = (pageId - 1) * 10 + 1,
        endId = startId + PAGE_SIZE - 1;

    let data = {
        colonies: [],
        startId,
        endId,
    };

    // If pageId is 1, then fetch saved data from Mongo
    if (pageId == 1) {
      data.colonies = (await getFirstPageFromMongo()).firstPage;
    }
    // Otherwise fetch from Ethereum network
    else {
      for (let id = startId; id < endId + 1; id++) {
        let address = (await networkClient.getColony.call({ id })).address;

        // If rest of page is empty (no colonies), then reset endId and
        // stop iterating
        if (!address) {
          data.endId = id - 1;
          id = endId + 1;
        } else {
          data.colonies.push({
            id,
            address,
          });
        }
      }
    }

    res.send(data);
  } catch (err) {
    res.send({ error: err.message });
  }
};

/*
* Get first page of colonies from Mongo. We currently only save the
* first page in Mongo.
*/
async function getFirstPageFromMongo() {
  const firstPage = await findOne('colonies', {name: 'colonies'}, {firstPage: 1}, '');
  return firstPage;
}
