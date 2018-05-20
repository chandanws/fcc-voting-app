const db = require("../../database").db;

exports.polls_list = (req, res) => {
  db
    .any("SELECT * FROM polls", [])
    .then(data => {
      res.status(200);
      res.set("Content-Type", "application/json");
      res.json({ status: "success", data });
    })
    .catch(err => {
      res.status(500);
      res.set("Content-Type", "application/json");
      res.json({ status: "error", message: err });
    });
};

exports.polls_detail = (req, res) => {
  res.send("polls_detail: NOT IMPPLEMENTED");
};

exports.polls_create = (req, res) => {
  // later user will be gained from JWT
  const { title, user_id } = req.body;
  if (!title) {
    res.status(400);
    res.set("Content-Type", "application/json");
    return res.json({ status: "fail", data: { title: "A title is required" } });
  }
  db
    .one("INSERT INTO polls (user_id, title) VALUES ($1, $2) RETURNING id", [
      user_id,
      title
    ])
    .then(data => {
      res.status(201);
      res.set("Location", `/polls/${data.id}`);
      res.set("Content-Type", "application/json");
      res.json({
        status: "success",
        data
      });
    })
    .catch(err => {
      res.status(500);
      res.json({
        status: "error",
        message: err
      });
    });
};

exports.polls_delete = (req, res) => {
  db
    .result("DELETE FROM polls WHERE id = $1", [req.params.poll_id])
    .then(result => {
      if (result.rowCount === 1) {
        console.log(result);
        res.status(204);
        res.json({ status: "success", data: null });
      } else {
        res.status(409);
        res.json({ status: "fail", data: { poll: "Poll doesn't exist" } });
      }
    })
    .catch(err => {
      res.json({ status: "error", message: err });
    });
};

exports.polls_update = (req, res) => {
  res.send("polls_update: NOT IMPLEMENETED");
};

exports.polls_vote = (req, res) => {
  res.send("polls_vote: NOT IMPLEMENETED");
};
