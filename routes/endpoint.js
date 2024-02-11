const express = require("express");
const endpoint = express.Router();
const { webhook } = require("../lib/middleware.js");
const catchError = require("../utils/catch-error.js");

endpoint.post("/createEndpoint", catchError(webhook.createNewEndpoint));

// Routes for handling reququests to new endpoint
endpoint.all("/req/:endpointHash", catchError(webhook.processRequest));

// Routes for getting info for client render
endpoint.get("/:endpointHash", catchError(webhook.getRequestsHandler));
endpoint.get(
  "/:endpointHash/:requestHash",
  catchError(webhook.getPayloadHandler),
);

module.exports = endpoint;
