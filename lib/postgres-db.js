"use strict";

const { dbQuery } = require('/db-query');

async function makeNewEndpoint(newEndpointID) {
  const MAKE_ENDPOINT = "INSERT INTO endpoints (endpoint_id) VALUES ($1)";
  const result = await dbQuery(MAKE_ENDPOINT, newEndpointID);
  return result.rowCount;
}

module.exports = {
  makeNewEndpoint,
};