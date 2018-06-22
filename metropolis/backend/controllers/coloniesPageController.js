import getNetworkClient from '../utils/colonyNetworkClient';
import { find, findOne } from '../utils/mongoUtils';
import { getTokenInfo } from '../utils/tokenUtils';
import getArrayOfRange from '../utils/arrayUtils';

let PAGE_SIZE = 10;

/*
* Retrieves a page of colonies to render the Colonies view.
*
* Colony data is fetched directly from Mongo as the colony-inspector caches this data.
*
*/
module.exports.getPageOfColonies = async function(req, res) {
  try {
    let networkClient = await getNetworkClient();

    let pageId = req.params.pageId || 1;
    let startId = (pageId - 1) * 10 + 1,
        endId = startId + PAGE_SIZE - 1;

    const colonyIdsArray = getArrayOfRange(startId, endId);
    const colonies = await find('colonies', {'id':{$in:colonyIdsArray}}, {}, '', 0, 0);

    res.send({
      colonies,
      startId,
      endId: startId + colonies.length - 1,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
};
