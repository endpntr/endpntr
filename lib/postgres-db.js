"use strict";

const { dbQuery } = require("../helper/db-query");

const generateTemporaryEndPointName = (() => {
  let count = 0;
  return () => {
    count += 1;
    return `Default${count}`;
  };
})();

async function findEndpoint(endpointHash) {
  const FIND_ENDPOINT = `
    SELECT *
    FROM endpoints
    WHERE endpoint_hash = $1;`;

  const result = await dbQuery(FIND_ENDPOINT, endpointHash);

  return result.rows[0];
}

async function findRequest(requestHash) {
  const FIND_REQUEST = `
    SELECT *
    FROM requests
    WHERE request_hash = $1`;

  const result = await dbQuery(FIND_REQUEST, requestHash);
  return result.rows[0];
}

async function postEndpoint(newEndpointHash) {
  const MAKE_ENDPOINT = `
    INSERT INTO endpoints
    (endpoint_hash, endpoint_name)
    VALUES ($1, $2);`;

  const result = await dbQuery(
    MAKE_ENDPOINT,
    newEndpointHash,
    generateTemporaryEndPointName(),
  );
  return result.rowCount > 0;
}

async function findRequest(requestHash) {
  const FIND_REQUEST = `
    SELECT *
    FROM requests
    WHERE request_hash = $1`;

  const result = await dbQuery(FIND_REQUEST, requestHash);
  return result.rows[0];
}

async function getAllRequests(endpointID) {
  const GET_REQUESTS = `
    SELECT *
    FROM requests
    WHERE endpoint_id = $1`;

  const result = await dbQuery(GET_REQUESTS, endpointID);
  return result.rows;
}

async function postRequest(parsedRequest, newRequestHash, documentID) {
  const MAKE_REQUEST = `
    INSERT INTO requests
    (endpoint_hash, http_method, http_path, endpoint_id, request_hash, document_id)
    VALUES ($1, $2, $3, $4, $5, $6);`;

  const currentEndpoint = await findEndpoint(parsedRequest.endpointHash);

  if (!currentEndpoint) {
    return false;
  }

  const result = await dbQuery(
    MAKE_REQUEST,
    ...Object.values(parsedRequest),
    currentEndpoint.endpoint_id,
    newRequestHash,
    documentID,
  );

  // If this complete successfully, we will go on to store payload

  return result.rowCount > 0;
}

module.exports = {
  findEndpoint,
  findRequest,
  postEndpoint,
  getAllRequests,
  postRequest,
};
