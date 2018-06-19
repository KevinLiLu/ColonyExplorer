import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mainPageController from './controllers/mainPageController';

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

router.get('/statistics/mongo', mainPageController.fetchStatisticsFromMongo);
router.get('/statistics/ethereum', mainPageController.fetchStatisticsFromEthereum);
router.get('/time-series-data/', mainPageController.fetchTimeSeriesData);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
