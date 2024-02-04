"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const config = require("./lib/config");
const { webhook, error } = require("./lib/middleware");
const catchError = require("./helper/catch-error");

const app = express();
const PORT = config.PORT;

// Make sure to have this set if running a built react app
if (config.ENV === "staging" || config.ENV === "prod") {
  app.use(express.static("dist"));
}

app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/api/createEndpoint", catchError(webhook.createNewEndpoint));

// Routes for handling reququests to new endpoint
app.get("/api/req/:endpointHash", catchError(webhook.processRequest));
app.post("/api/req/:endpointHash", catchError(webhook.processRequest));
app.put("/api/req/:endpointHash", catchError(webhook.processRequest));
app.delete("/api/req/:endpointHash", catchError(webhook.processRequest));

// Routes for getting info for client render
app.get("/api/:endpointHash", catchError(webhook.getRequestsHandler));
app.get(
  "/api/:endpointHash/:requestHash",
  catchError(webhook.getPayloadHandler),
);

// Ignore Favicon
app.get("/*", error.handleFavicon);

// Catch-all error handler
app.use(error.generalErrorHandler);

app.listen(PORT, () => console.log("Team08 RequestBin clone is running..."));
