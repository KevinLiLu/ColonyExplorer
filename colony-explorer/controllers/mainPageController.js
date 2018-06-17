module.exports.fetchStatistics = function(req, res) {
  let data = {};

  // TODO: remove this dummy data
  model['total-colony-count'] = 123;

  // total-colony-count

  // total-task-count

  // total-domain-count

  // total-skill-count

  res.send(data);
}
