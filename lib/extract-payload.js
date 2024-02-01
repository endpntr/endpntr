function extractPayload(req) {
  const { rawHeaders, body } = req;

  return {
    headers: rawHeaders,
    body,
  };
}

module.exports = extractPayload;
