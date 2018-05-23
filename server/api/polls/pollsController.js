const db = require("../../database").db;
const pgp = require("../../database").pgp;

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
  // TODO: later, we will need to implement transaction so that options get added as well

  const { title, options } = req.body;
  if (!title || options === undefined || options.length < 2) {
    res.status(400);
    res.set("Content-Type", "application/json");
    return res.json({ status: "fail", data: { title: "A title is required" } });
  }

  db
    .task(async t => {
      const poll = await t.one(
        "INSERT INTO polls (user_id, title) VALUES ($1, $2) RETURNING id",
        [res.locals.id, title]
      );
      const cs = new pgp.helpers.ColumnSet(["poll_id", "name"], {
        table: "options"
      });
      const values = options.map(option => {
        return { poll_id: poll.id, name: option };
      });
      const query = pgp.helpers.insert(values, cs);
      const nothing = await t.none(query);
      return { id: poll.id };
    })
    .then(data => {
      res.status(201);
      res.set("Location", `/polls/${data.id}`);
      res.set("Content-Type", "application/json");
      return res.json({
        status: "success",
        data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({
        status: "error",
        message: err
      });
    });
};

exports.polls_delete = (req, res) => {
  db
    .result("DELETE FROM polls WHERE id = $1 AND user_id = $2", [
      req.params.poll_id,
      res.locals.id
    ])
    .then(result => {
      if (result.rowCount === 1) {
        res.status(204);
        res.json({ status: "success", data: null });
      } else {
        res.status(400);
        res.json({
          status: "fail",
          data: { poll: "Poll doesn't exist or invalid token" }
        });
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
