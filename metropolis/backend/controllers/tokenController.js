import { getTokenInfo } from '../utils/tokenUtils';

module.exports.getTokenInfo = async function(req, res) {
  let { colonyId } = req.params;
  let data = await getTokenInfo(colonyId);
  res.send(data);
}
