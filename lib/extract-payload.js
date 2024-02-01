function extractPayload(req) {
  const { headers, body } = req;

  return {
    headers:rawHeader,
    body,
  };
}

module.exports = extractPayload;
