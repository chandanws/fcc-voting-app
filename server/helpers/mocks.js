const db = require("../database").db;
const clearDatabase = () => {
  return db.none("TRUNCATE users RESTART IDENTITY CASCADE");
};

const insertUser = (
  user = { username: "user1", hash: "pass", salt: "salt" }
) => {
  return db.none(
    "INSERT INTO users (username, hash, salt) VALUES (${username}, ${hash}, ${salt})",
    user
  );
};

module.exports = {
  clearDatabase
};
