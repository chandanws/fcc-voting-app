const db = require("../../database").db;
const helpers = require("../../helpers");
const response = require("../../helpers/response");

exports.login = (req, res) => {
  const { username, password } = req.body;
  let statusCode = 200;
  let body = {};

  if (!password) {
    res.status(400);
    return res.send(response.failPOST("password", "Password is missing."));
  }
  if (!username) {
    res.status(400);
    return res.send(response.failPOST("username", "Username is missing."));
  }
  db.oneOrNone("SELECT * FROM users WHERE username = ${username}", {
    username
  })
    .then(data => {
      // part1 checks if user with username even exists
      // part2 compared hashed passwords

      if (
        data === null ||
        helpers.sha512(password, data.salt).hash !== data.hash
      ) {
        statusCode = 401;
        body = {
          status: "fail",
          data: { authorization: "Wrong username or password." }
        };
        return res.status(statusCode).send(body);
      }
      const token = helpers.createJWT(data.username, data.id, 60);
      res.status(204);
      res.set("Authorization", `Bearer ${token}`);
      return res.send({});
    })
    .catch(err => {
      console.error(err);
    });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!password) {
    res.status(400);
    return res.send(response.failPOST("password", "Password is missing."));
  }
  if (!username) {
    res.status(400);
    return res.send(response.failPOST("username", "Username is missing."));
  }

  db.task("user registration", async t => {
    const result = await t.result("SELECT * FROM users WHERE username = $1", [
      username
    ]);
    if (result.rowCount === 1) {
      return false;
    } else {
      const salt = helpers.generateSalt(16);
      const obj = helpers.sha512(password, salt);
      return await t.one(
        "INSERT INTO users (username, hash, salt) VALUES (${username}, ${hash}, ${salt}) RETURNING id, username",
        {
          username,
          hash: obj.hash,
          salt: obj.salt
        }
      );
    }
  })
    .then(result => {
      if (!result) {
        res.status(409);
        return res.send("error");
      }
      res.status(201);
      const token = helpers.createJWT(result.username, result.id, 60);
      res.set("Authorization", `Bearer ${token}`);
      return res.send({
        status: "success",
        data: null
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      return res.send(response.serverError());
    });
};
