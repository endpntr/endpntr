"use strict";

const cryptoStr = require("./hash");
const postgres = require("./postgres-db");
const mongo = require("./mongo-db");
const parseRequest = require("./parse-request");
const extractPayload = require("./extract-payload");

const ENDPOINT_ID_LENGTH = 8;
const REQUEST_ID_LENGTH = 16;

// Error Handler Middleware
function generalErrorHandler(err, _req, res, _next) {
  res.status(500).send(`${err}`);
}

function handleFavicon(req, res, next) {
  if (req.url === "/favicon.ico") res.status(404).send();
  else next();
}

// app middleware
/*make new endpoint then GET redirect to "/req/:endpointID"*/
async function createNewEndpoint(_req, res) {
  const newEndpointID = cryptoStr(ENDPOINT_ID_LENGTH);
  const result = await postgres.postEndpoint(newEndpointID);
  res.redirect(`/req/${newEndpointID}`);
}

/*generate and display endpoint page*/
async function getRequestsHandler(req, res) {
  const endpointHash = req.params.endpointHash;
  const endpointRecord = await postgres.findEndpoint(endpointHash);
  if (!endpointRecord) {
    return res.status(400).send({ error: "Could not process request" });
  }

  const endpointID = endpointRecord.endpoint_id;
  const requests = await postgres.getAllRequests(endpointID);
  if (!requests) {
    return res.status(400).send({ error: "Could not process request" });
  }

  // res.render('endpoint', { requests });

  res.status(200).send(requests);
}

/*render the entire page with request content*/
async function getPayloadHandler(req, res) {
  const { endpointHash } = req.params;
  const endpoint = await postgres.findEndpoint(endpointHash);
  console.log(endpoint, endpoint.document_id);
  const result = await mongo.getRequestFromMongo(endpoint.document_id);

  if (!result) {
    return res.status(400).send({
      error: "Could not process request",
    });
  }

  res.status(200).send(result);
}

async function processRequest(req, res) {
  const newRequestHash = cryptoStr(REQUEST_ID_LENGTH);
  const extractedMetaData = parseRequest(req);

  const payloadID = await mongo.addRequestToMongo(extractPayload(req));
  console.log(payloadID);

  const result = await postgres.postRequest(extractedMetaData, newRequestHash, payloadID);
  if (!result) {
    return res.status(400).send({
      error: "Could not process request",
    });
  }

  res.status(201).send();
}

module.exports.webhooksMiddleware = {
  createNewEndpoint,
  getRequestsHandler,
  getPayloadHandler,
  processRequest,
};

module.exports.errors = {
  generalErrorHandler,
  handleFavicon,
};
