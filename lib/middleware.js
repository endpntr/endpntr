"use strict";

const cryptoStr = require("./hash");
const postgres = require("./postgres-db");
const parseRequest = require("./parse-request");

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
    res.status(400).send({error: "Could not process request"});
  }

  const endpointID = endpointRecord.endpoint_id;
  console.log(typeof endpointID);
  const allRequests = postgres.getAllRequests(endpointID);
  res.status(200).send(allRequests);
  // const url = `${endpointHash}.req.endpntr.com`;
  // res.send(url);
}

/*render the entire page with request content*/
async function viewRequest(req, res) {}

async function processRequest(req, res) {
  const newEndpointID = cryptoStr(REQUEST_ID_LENGTH);
  const parsed = parseRequest(req);

  const result = await postgres.postRequest(parsed, newEndpointID);
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
  viewRequest,
  processRequest,
};

module.exports.errors = {
  generalErrorHandler,
  handleFavicon,
};
