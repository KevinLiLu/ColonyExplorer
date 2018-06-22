import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Controllers
import coloniesPageController from './controllers/coloniesPageController';
import tokenController from './controllers/tokenController';
import countsController from './controllers/countsController';
import timeSeriesDataController from './controllers/timeSeriesDataController';
import skillsPageController from './controllers/skillsPageController';
import domainsPageController from './controllers/domainsPageController';
import tasksPageController from './controllers/tasksPageController';
import taskPageController from './controllers/taskPageController';
import skillPageController from './controllers/skillPageController';
import domainPageController from './controllers/domainPageController';
import colonyPageController from './controllers/colonyPageController';

// and create our instances
const app = express();
const router = express.Router();

// Set backend server proxy port to 3001
const API_PORT = process.env.API_PORT || 3001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Use our router configuration when we call /api
app.use('/api', router);

// Counts calls
router.get('/network/count/domain', countsController.getNetworkDomainCount);
router.get('/network/count/task', countsController.getNetworkTaskCount);
router.get('/network/count/colony', countsController.getNetworkColonyCount);
router.get('/network/count/skill', countsController.getNetworkSkillCount);

// Home page api routes
router.get('/time-series-data/:name', timeSeriesDataController.getTimeSeriesData);

// Colonies page api routes
router.get('/colonies/', coloniesPageController.getPageOfColonies);
router.get('/colonies/:pageId', coloniesPageController.getPageOfColonies);

// Skill
router.get('/skill/:skillId', skillPageController.getSkillFromEthNetwork);

// Skills
router.get('/skills/', skillsPageController.getPageOfSkills);
router.get('/skills/:pageId', skillsPageController.getPageOfSkills);

// Domains
router.get('/domain/:colonyId/:domainId', domainPageController.getDomainDetailsFromEthNetwork);
router.get('/domains/ethereum/:colonyId/:startId/:endId?', domainsPageController.getDomainsFromEthNetwork);
router.get('/domains/', domainsPageController.getPageOfDomains);
router.get('/domains/:pageId', domainsPageController.getPageOfDomains);

// Task page
router.get('/task/:colonyId/:taskId', taskPageController.getTaskDetailsFromEthNetwork);

// Tasks page
router.get('/tasks/ethereum/:colonyId/:startId/:endId?', tasksPageController.getTasksFromEthNetwork);
router.get('/tasks/', tasksPageController.getPageOfTasks);
router.get('/tasks/:pageId', tasksPageController.getPageOfTasks);

//Colony page api routes
router.get('/colony/address/:id', colonyPageController.fetchAddressFromEth);
router.get('/colony/domain/:id', colonyPageController.fetchDomainFromEth);
router.get('/colony/task/:id', colonyPageController.fetchTaskFromEth);

// Token api routes
router.get('/token/colonyId/:colonyId', tokenController.getTokenInfo);

// Pot data
// router.get('/reward-pot/:colonyId', potsController.getRewardPotBalances);
// router.get('/non-reward-pot/:colonyId', potsController.getNonRewardPotsBalances);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
