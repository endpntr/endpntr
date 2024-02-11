function parseRequest(req) {
  const { method, baseUrl, path } = req;
  const endpointHash = req.params.endpointHash;
  const fullPath = baseUrl + path;

  return {
    endpointHash,
    method,
    fullPath,
  };
}

module.exports = parseRequest;
