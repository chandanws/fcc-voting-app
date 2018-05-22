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

exports.sha512 = (password, salt) => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt,
    hash: value
  };
};
