const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "request_payload";

async function addRequestToMongo(request) {
  await client.connect();

  const database = client.db(dbName);
  const result = await database.collection('requests').insertOne(request);
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