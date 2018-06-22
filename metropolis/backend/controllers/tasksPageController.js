import getNetworkClient from '../utils/colonyNetworkClient';
import { find } from '../utils/mongoUtils';

const PAGE_SIZE = 10;

module.exports.getPageOfTasks = async function(req, res) {
  let response = {
    tasks: [],
  };

  try {
    let pageId = req.params.pageId || 1;
    let startId = (pageId - 1) * 10 + 1,
        endId = startId + PAGE_SIZE - 1;

    const tasks = await find('tasks', {}, {}, '', startId - 1, PAGE_SIZE);

    response = {
      tasks,
      startId,
      endId: startId + tasks.length - 1,
    }
  } catch (error) {
    response.error = error.message;
  }
  res.send(response);
};

/*
* Controller method to retrieve task details from ethereum network for tasks
* between startId and endId for a given colonyId.
*/
module.exports.getTasksFromEthNetwork = async function(req, res) {
  let response = {
    tasks: [],
  };

  try {
    const { colonyId, startId, endId } = req.params;
    let networkClient = await getNetworkClient();
    let colonyClient = await networkClient.getColonyClient(parseInt(colonyId));
    let totalTaskCount = (await colonyClient.getTaskCount.call()).count;

    for (var taskId = parseInt(startId); taskId < parseInt(endId) + 1 && taskId < totalTaskCount + 1; taskId++) {
      let task = await colonyClient.getTask.call({ taskId });
      response.tasks.push(task);
    }
  } catch (error) {
    response.error = error.message;
  };

  res.send(response);
};
