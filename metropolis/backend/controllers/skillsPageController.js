import getNetworkClient from '../utils/colonyNetworkClient';

const PAGE_SIZE = 10;

/*
* Retrieves a page of skills to render the Skills view.
*/
module.exports.getPageOfSkills = async function(req, res) {
  try {
    let networkClient = await getNetworkClient(),
        totalSkillCount = (await networkClient.getSkillCount.call()).count;

    let pageId = req.params.pageId || 1;
    let startId = (pageId - 1) * 10 + 1,
        endId = startId + PAGE_SIZE - 1;

    let data = {
      startId,
      endId,
      skills: [],
    };

    for (let skillId = startId; skillId < endId + 1 && skillId <= totalSkillCount; skillId++) {
      let { nParents, nChildren } = await networkClient.getSkill.call({skillId});

      // If rest of page is empty (no skills), then reset endId and
      // stop iterating
      if (skillId == totalSkillCount) {
        data.endId = totalSkillCount;
      }

      data.skills.push({
        skillId,
        nParents,
        nChildren,
      });
    };

    res.send(data);
  } catch (err) {
    res.send({ error: err.message });
  }
};
