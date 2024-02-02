"use strict";

const express = require("express");
const subdomain = require("express-subdomain");
const morgan = require("morgan");

const config = require("./lib/config");
const webhook = require("./lib/middleware").webhooksMiddleware;
const errors = require("./lib/middleware").errors;
const catchError = require("./lib/catch-error");

const app = express();
const PORT = config.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// const endpoint = subdomain("*.req", (req, res, next) => {});

app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
// app.use(endpoint);
app.use(express.json());

app.get("/", (_, res) => res.render("index"));
app.post("/createEndpoint", catchError(webhook.createNewEndpoint));
app.get("/req/:endpointHash", catchError(webhook.viewEndpoint));
app.get("/req/:endpointHash/:requestHash", catchError(webhook.displayRequest));

app.post("/req/:endpointHash", catchError(webhook.processRequest));

// Ignore Favicon
app.get("/*", errors.handleFavicon);

// Catch-all error handler
app.use(errors.generalErrorHandler);

// attach the `res` subdomain to the main app
// app.use(subdomain("req", app));
// app.use(subdomain("*", app));

app.listen(PORT, () => console.log("Team08 RequestBin clone is running..."));
