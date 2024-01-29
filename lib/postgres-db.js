"use strict";

const { dbQuery } = require('/db-query');

async function makeNewEndpoint(newEndpointID) {
  const MAKE_ENDPOINT = "INSERT INTO endpoints (endpoint_id) VALUES ($1)";
  
}