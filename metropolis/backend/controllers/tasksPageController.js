import getNetworkClient from '../utils/colonyNetworkClient';
import { findOne } from '../utils/mongoUtils';

const PAGE_SIZE = 10;

module.exports.getPageOfTasks = async function(req, res) {
  try {
    // let networkClient = await getNetworkClient();
    //
    // let pageId = req.params.pageId || 1;
    // let startId = (pageId - 1) * 10 + 1,
    //     endId = startId + PAGE_SIZE - 1;
    //
    // let totalColonyCount = (await networkClient.getColonyCount.call()).count;
    // for (var i = 1; i < totalColonyCount + 1; i++) {
    //   console.log(`colonyId: ${i}`);
    //   let colonyClient = await networkClient.getColonyClient(i);
    //   let taskCount = (await colonyClient.getTaskCount.call()).count;
    //   console.log(`taskCount: ${taskCount}`);
    //   for (var j = 1; j < taskCount + 1; j++) {
    //     let task = await colonyClient.getTask.call({ taskId: j });
    //     console.log(JSON.stringify(task));
    //   }
    // }
    res.send({});
  } catch (error) {
    console.log(error.message);
  }
  // res.send({});
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
