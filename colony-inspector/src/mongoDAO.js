const config = require('../config.json').mongo;
const MongoClient = require('mongodb').MongoClient;

const hostname = config.hostname;
const port = config.port;
const user = encodeURIComponent(config.user);
const password = encodeURIComponent(config.password);
const authMechanism = 'DEFAULT';
const url = `mongodb://${user}:${password}@${hostname}:${port}/?authMechanism=${authMechanism}`;

const dbName = config.database;

var mongoClient;

/*
* Creates a MongoClient and connects to Mongo.
*/
connectToMongo = async () => {
  // Re-use the same Mongo connection so we do not keep creating connections
  if (!mongoClient)
    mongoClient = await MongoClient.connect(url);

  return mongoClient;
};

/*
* Finds and returns one document.
*/
findOne = async (collectionName, query, fields, sortByField) => {
  const mongoClient = await connectToMongo();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  const doc = await collection.findOne(query, fields);
  return doc;
};

/*
* Finds and updates one document.
*/
updateOne = async (collectionName, query, entry) => {
  const mongoClient = await connectToMongo();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  collection.updateOne(query, {$set: entry});
}

module.exports = {
  findOne,
  updateOne
}
