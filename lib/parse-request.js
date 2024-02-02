function parseRequest(req) {
  const { method, path } = req;
  const endpointHash = req.params.endpointHash

  return {
    endpointHash,
    method,
    path,
  };
}

module.exports = parseRequest;
