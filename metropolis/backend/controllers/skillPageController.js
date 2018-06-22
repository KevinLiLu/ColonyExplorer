import getNetworkClient from '../utils/colonyNetworkClient';

/*
* Retrieves the details of a skill from the Ethereum network.
*/
module.exports.getSkillFromEthNetwork = async function(req, res) {
  let response = {
    fields: [],
  };

  try {
    const { skillId } = req.params;
    let networkClient = await getNetworkClient();
    let skill = await networkClient.getSkill.call({ skillId: parseInt(skillId) });

    for(var key in skill) {
      if(skill.hasOwnProperty(key)) {
        response.fields.push([key, skill[key]]);
      }
    }
  } catch (error) {
    response.error = error.message;
  };

  res.send(response);
};
