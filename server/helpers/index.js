const crypto = require("crypto");

exports.decodeJWT = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("-", "/");
  return JSON.parse(window.atob(base64));
};

exports.generateSalt = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
