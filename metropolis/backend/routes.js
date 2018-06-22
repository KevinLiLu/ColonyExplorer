//Colony page api routes
router.get('/colony/address/:id', colonyPageController.fetchAddressFromEth);
router.get('/colony/domain/:id', colonyPageController.fetchDomainFromEth);
// router.get('/colony/tasks', colonyPageController.fetchTaskFromEth);
// router.get('/colony/reward-pot/:source', colonyPageController.fetchRewardPotFromEth);
// router.get('/colony/non-reward-pot:source', colonyPageController.fetchNonRewardPotFromEth);
router.get('/colony/token/:id', colonyPageController.fetchTokenfromEth);
