function extractPayload(req) {
  const { headers, body } = req;

  return {
    headers,
    body,
  };
}

module.exports = extractPayload;
