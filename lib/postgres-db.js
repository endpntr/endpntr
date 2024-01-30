"use strict";

const { dbQuery } = require('/db-query');

const generateTemporaryEndPointName = (() => {
  let count = 0;
  return () => {
    count += 1;
    return `Default${count}`;
  }
})();

async function postEndpoint(newEndpointHash) {
  const MAKE_ENDPOINT = "INSERT INTO endpoints (endpoint_hash, endpoint_name) VALUES ($1, $2)";

  const result = await dbQuery(MAKE_ENDPOINT, newEndpointHash, generateTemporaryEndPointName());
  return result.rowCount;
}

module.exports = {
  postEndpoint,
};
