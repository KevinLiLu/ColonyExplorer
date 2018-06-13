// the is the basic configuation for the server
// code borrowed from class work

// grabbing values from .env file
require('dotenv').config();

// basic imports for server
const express     = require('express');
const logger      = require('morgan');
const parser      = require('body-parser');
const path        = require('path');
const fetch       = require('node-fetch');
// const authRouter  = require('./user/auth/authRouter');

// configuring database for router
const db = require('./config/connect');

// configuring the routers, inserting the db config
const userAuth    = require('./user-auth')(db);
const coins       = require('./coin')(db);
// const comments    = require('./comment')(db);

const model = require('./user-auth/user-authModel')(db);
// gets the controllers and gets passed the models
const controller = require('./user-auth/user-authController')(model);

// configuring the functions for auth/tokens
// const { authRouter, AuthController } = require('./user-auth');
const token = require('./user-auth/user-authToken');
const auth = require('./user-auth/user-authController');

// console.log(auth);
// console.log(AuthController);


// grabbing express function
const app = express();

// setting up port
const PORT = process.env.PORT || 3000;

// obtaining the data from .env
// app.set('cryptoKey', process.env.CRYPTO_NEWS_API_KEY);
// app.set('tokenKey', process.env.TOKEN_SECRET);
// const cryptoKey = app.get('cryptoKey');
// console.log(cryptoKey);

// this will get the key for usage
// grabbing the value of the .env new key to use in the fetch
const cryptoKey = process.env.CRYPTO_NEWS_API_KEY;

// console.log(cryptoKey);

// setting up morgan for dev logging in terminal
app.use(logger('dev'));

// setting up body parser for grabbing information
app.use(parser.json());

// setting up path for dist folder (for static React files)
app.use(express.static(path.join(__dirname, 'dist')));

// setting up function to receive token
app.use(token.receiveToken);


// this is the route for the user auth (subject to change)
app.use('/api/user/auth', (req, res, next) => {
  req.user = {
    userID: 1,
  };

  next();
}, userAuth);

// this is the route for the comment router to use for the comment routes
// app.use('/api/coins/comments', (req, res, next) => {
//   // this is dummy data for testing
//   req.user = {
//     userID:    1,
//     coinID:    1,
//     commentID: 2,
//   };

//   next();
// }, comments);

// app.use('/api/coins/comments', controller.allow({ roles: ['user'] }), comments);

// app.use('/api/coins/', (req, res, next) => {
//   req.user = {
//     userID: 1,
//     coinID: 1,
//   };

//   next();
// }, coins);

app.use('/api/coins', controller.allow({ roles: ['user'] }), coins);

app.use('/api/news/', (req, res, next) => {
  req.user = {
    userID: 1,
    coinID: 1,
  };

  const url = `https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${cryptoKey}`;
  fetch(url)
    .then(data => data.json())
    .then(news => res.json(news.articles));
  // res.send('I AM NEWS');

  // next();
});

app.get('/', (req, res) => { res.json('THIS IS TEST'); });

// this will allow th use of any API routee when fully authorized
// app.use('/api', AuthService.allow({ roles: ['user'] }), cardRouter);

// route config for React Router
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});

// main error handler
app.use((err, req, res, next) => {
  // console.error('THIS BE BIG ERROR', err);
  res.status(500).send('IT BE BROKE');
});

// this starts listening on the server, logging out a confirmation, and errors if any
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
// .on(
//   'THIS iS ERROR'
//   , console.error,
// );

// exporting app? why?
module.exports = app;
