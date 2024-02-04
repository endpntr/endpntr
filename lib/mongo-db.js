const { MongoClient } = require("mongodb");
const config = require("./config");
const url = config.MONGO_URL;
const client = new MongoClient(url);
const dbName = config.MONGO_DB_NAME;
const ObjectId = require("bson").ObjectId;

async function addRequestToMongo(request) {
  await client.connect();

  const database = client.db(dbName);
  const result = await database.collection("requests").insertOne(request);
  const newID = result.insertedId.toString();

  await client.close();

  return newID;
}

async function getRequestFromMongo(reqId) {
  await client.connect();

  const obj = new ObjectId(reqId);

  const database = client.db(dbName);
  const document = await database.collection("requests").findOne({ _id: obj });

  console.log("Retrieved item: ", document);

  await client.close();

  return document;
}

module.exports = {
  addRequestToMongo,
  getRequestFromMongo,
};
