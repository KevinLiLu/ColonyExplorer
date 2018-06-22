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
async function connectToMongo() {
  // Re-use the same Mongo connection so we do not keep creating connections
  if (!mongoClient)
    mongoClient = await MongoClient.connect(url);

  return mongoClient;
};

/*
* Searchs for multiple documents.
*/
export async function find(collectionName, query, fields, sortByField, skip, limit) {
  const mongoClient = await connectToMongo();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  const docs = await collection.find(query, {'fields': {_id: 0, ...fields}}).skip(skip).limit(limit).toArray();
  return docs;
}

/*
* Finds and returns one document.
*/
export async function findOne(collectionName, query, fields, sortByField) {
  const mongoClient = await connectToMongo();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  const doc = await collection.findOne(query, {'fields': {_id: 0, ...fields}});
  return doc;
};

/*
* Finds and updates one document.
*/
export async function updateOne(collectionName, query, entry) {
  const mongoClient = await connectToMongo();
  const db = mongoClient.db(dbName);
  const collection = db.collection(collectionName);
  collection.updateOne(query, {$set: entry});
}
