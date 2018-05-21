const db = require("../../database").db;

exports.login = (req, res) => {
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
        return await t.one(
          "INSERT INTO users (username, hash, salt) VALUES (${username}, ${hash}, ${salt}) RETURNING id, username",
          {
            username: username,
            hash: password,
            salt: "salt"
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
