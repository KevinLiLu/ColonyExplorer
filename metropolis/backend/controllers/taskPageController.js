import getNetworkClient from '../utils/colonyNetworkClient';

/*
* Controller method to retrieve a task's details from ethereum network.
*/
module.exports.getTaskDetailsFromEthNetwork = async function(req, res) {
  let response = {
    fields: [],
  };

  try {
    const { colonyId, taskId } = req.params;
    let networkClient = await getNetworkClient();
    let colonyClient = await networkClient.getColonyClient(parseInt(colonyId));
    let task = await colonyClient.getTask.call({ taskId: parseInt(taskId) });

    for(var key in task) {
      if(task.hasOwnProperty(key)) {
        response.fields.push([key, task[key]]);
      }
    }
  } catch (error) {
    response.error = error.message;
  };

  res.send(response);
};
