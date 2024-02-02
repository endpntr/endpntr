"use strict";

const express = require("express");
const morgan = require("morgan");

const config = require("./lib/config");
const webhook = require("./lib/middleware").webhooksMiddleware;
const errors = require("./lib/middleware").errors;
const catchError = require("./lib/catch-error");

const app = express();
const PORT = config.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("dist"));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/createEndpoint", catchError(webhook.createNewEndpoint));
app.get("/api/req/:endpointHash", catchError(webhook.getRequestsHandler));
app.get(
  "/api/req/:endpointHash/:requestHash",
  catchError(webhook.getPayloadHandler),
);

app.post("/api/req/:endpointHash", catchError(webhook.processRequest));

// Ignore Favicon
app.get("/*", errors.handleFavicon);

// Catch-all error handler
app.use(errors.generalErrorHandler);

app.listen(PORT, () => console.log("Team08 RequestBin clone is running..."));
