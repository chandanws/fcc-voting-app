const jwt = require("jsonwebtoken");
const db = require("../../database").db;
const helpers = require("../../helpers");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!password) {
    res.status(400);
    return res.send({
      status: "fail",
      data: { password: "password is missing" }
    });
  }
  if (!username) {
    res.status(400);
    return res.send({
      status: "fail",
      data: { username: "username is missing" }
    });
  }

  res.send("NOT IMPLEMENETED");
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!password) {
    res.status(400);
    return res.send({
      status: "fail",
      data: { password: "password is missing" }
    });
  }

  if (!username) {
    res.status(400);
    return res.send({
      status: "fail",
      data: { username: "username is missing" }
    });
  }

  db
    .task("user registration", async t => {
      const result = await t.result("SELECT * FROM users WHERE username = $1", [
        username
      ]);
      if (result.rowCount === 1) {
        return false;
      } else {
        const salt = helpers.generateSalt(16);
        const hash = helpers.sha512(password, salt);
        return await t.one(
          "INSERT INTO users (username, hash, salt) VALUES (${username}, ${hash}, ${salt}) RETURNING id, username",
          {
            username,
            hash,
            salt
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

      const token = jwt.sign(
        {
          data: { username: result.username, id: result.id },
          exp: Math.floor(Date.now() / 1000) + 3600
        },
        process.env.TOKEN_SECRET
      );
      res.set("Authorization", `Bearer ${token}`);
      return res.send({
        status: "success",
        data: {
          user: "NOT IMPLEMENETED"
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send("NOT IMPLEMENTED");
    });
};
