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
    .result("SELECT * FROM users WHERE username = $1", [username])
    .then(result => {
      if (result.rowCount === 1) {
        res.status(409);
        return res.send("error");
      }
    })
    .catch(err => {
      return res.status(500).send("NOT IMPLEMENTED");
    });
};
