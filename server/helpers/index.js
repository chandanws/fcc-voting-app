const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.decodeJWT = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("-", "/");
  return JSON.parse(window.atob(base64));
};

exports.createJWT = (
  username,
  id,
  minutes = 60,
  secret = process.env.TOKEN_SECRET
) => {
  const token = jwt.sign(
    {
      data: { username, id },
      exp: Math.floor(Date.now() / 1000) + minutes * 60
    },
    secret
  );
  return token;
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

exports.makeTree = function(options) {
  let children, e, id, o, pid, temp, _i, _len, _ref;
  id = options.id || "comment_id";
  pid = options.parentid || "parent_id";
  children = options.children || "children";
  temp = {};
  o = [];
  _ref = options.q;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    e = _ref[_i];
    e[children] = [];
    temp[e[id]] = e;
    if (temp[e[pid]] != null) {
      temp[e[pid]][children].push(e);
    } else {
      o.push(e);
    }
  }
  return o;
};
