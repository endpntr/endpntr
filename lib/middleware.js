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
async function viewEndpoint(req, res) {
  const endpointHash = req.params.endpointHash;
  const endpointRecord = await postgres.findEndpoint(endpointHash);
  if (!endpointRecord) {
    return res.status(400).send({error: "Could not process request"});
  }

  const endpointID = endpointRecord.endpoint_id;
  const requests = await postgres.getAllRequests(endpointID);
  if (!requests) {
    return res.status(400).send({error: "Could not process request"});
  }

  res.render('endpoint', { requests, endpointHash });

  // res.status(200).send(allRequests);

}

/*render the entire page with request content*/
async function displayRequest(req, res) {
  const { requestHash, endpointHash } = req.params;
  const singleRequest = await postgres.findRequest(requestHash);
  console.log(singleRequest, singleRequest.document_id);
  const result = await mongo.getRequestFromMongo(singleRequest.document_id);
  console.log("result: ", result);

  if (!result) {
    return res.status(400).send({
      error: "Could not process request",
    });
  }

  let { headers, body } = result;
  headers = Object.entries(headers);

  const currEndpoint = await postgres.findEndpoint(endpointHash);
  if (!currEndpoint) {
    return res.status(400).send({error: "Could not process request"});
  }
  const requests = await postgres.getAllRequests(currEndpoint.endpoint_id);
  if (!requests) {
    return res.status(400).send({error: "Could not process request"});
  }

  console.log("Test", headers);
  res.status(200).render("request", { requests, headers, body });
  // res.status(200).send(result);
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
  viewEndpoint,
  displayRequest,
  processRequest,
};

module.exports.errors = {
  generalErrorHandler,
  handleFavicon,
};
