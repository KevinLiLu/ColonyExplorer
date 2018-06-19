import { getTokenInfo } from '../utils/tokenUtils';

module.exports.getTokenInfo = async function(req, res) {
  let { tokenId } = req.params;
  let data = await getTokenInfo(tokenId);
  res.send(data);
}
