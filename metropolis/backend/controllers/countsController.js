import { findOne } from '../utils/mongoUtils';
import getNetworkClient from '../utils/colonyNetworkClient';

module.exports.getNetworkColonyCount = async function(req, res) {
  let networkClient = await getNetworkClient();
  let totalColonyCount = (await networkClient.getColonyCount.call()).count;
  res.send({ totalColonyCount });
};

module.exports.getNetworkSkillCount = async function(req, res) {
  let networkClient = await getNetworkClient();
  let totalSkillCount = (await networkClient.getSkillCount.call()).count;
  res.send({ totalSkillCount });
};

module.exports.getNetworkDomainCount = async function(req, res) {
  const data = await findOne('statistics', {name: 'statistics'}, {'total-domain-count': 1}, '');
  const totalDomainCount = data['total-domain-count'];
  res.send({ totalDomainCount });
};

module.exports.getNetworkTaskCount = async function(req, res) {
  const data = await findOne('statistics', {name: 'statistics'}, {'total-task-count': 1}, '');
  const totalTaskCount = data['total-task-count'];
  res.send({ totalTaskCount });
};
