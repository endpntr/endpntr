const crypto = require("crypto");

function cryptoStr(length) {
  if (length <= 0 || typeof length !== "number") {
    throw new Error("Length must be greater than 0");
  }

  // In base64 encoding, each char is 6 bytes or .75 bits
  const byteLength = Math.ceil(length * 0.75);
  const randomBytes = crypto.randomBytes(byteLength);

  const randomString = randomBytes
    .toString("base64")
    .slice(0, length)
    .replace(/\+/g, "0")
    .replace(/\//g, "0");

  return randomString.toLowerCase();
}

module.exports = cryptoStr;
