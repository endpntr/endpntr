"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { app } = require("./bin/www/server");
const config = require("./lib/config");
const { error } = require("./lib/middleware");
const endpoint = require("./routes/endpoint");

// Make sure to have this set if running a built react app
if (config.ENV === "staging" || config.ENV === "prod") {
  app.use(express.static("dist"));
}

app.use(morgan("common"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", endpoint);

// Catch all to server react app
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Catch-all error handler
app.use(error.generalErrorHandler);
