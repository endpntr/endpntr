function parseRequest(req) {
  const { hostname, method, path } = req;
  const endpointHash = hostname.slice(0, hostname.indexOf("."));

  return {
    endpointHash,
    method,
    path,
  };
}

module.exports = parseRequest;
