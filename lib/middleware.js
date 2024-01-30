"use strict";

const cryptoStr = require("./hash");
const postgres = require("./postgres-db");

const ENDPOINT_ID_LENGTH = 8;
const REQUEST_ID_LENGTH = 16;

// Error Handler Middleware
function generalErrorHandler(err, req, res, _next) {
  res.status(500).send(`${err}`);
}

function handleFavicon(req, res, next) {
  if (req.url === "/favicon.ico") res.status(404).send();
  else next();
}

// app middleware
/*make new endpoint then GET redirect to "/req/:endpointID"*/
async function createNewEndpoint(req, res) {
  const newEndpointID = cryptoStr(ENDPOINT_ID_LENGTH);
  const result = await postgres.postEndpoint(newEndpointID);
  res.redirect(`/req/${newEndpointID}`);
}

/*generate and display endpoint page*/
async function viewEndpoint(req, res) {
  const endpointHash = req.params.endpointHash;
  const url = `${endpointHash}.req.endpntr.com`;
  res.send(url);
}

/*render the entire page with request content*/
async function viewRequest(req, res) {}

async function processRequest(req, res) {}

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
