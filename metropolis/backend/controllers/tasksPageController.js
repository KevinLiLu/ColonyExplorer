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

  res.send({});
};
