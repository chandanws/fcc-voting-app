const db = require("../../database").db;
const pgp = require("../../database").pgp;
const response = require("../../helpers/response");

exports.polls_list = (req, res) => {
  db
    .any("SELECT id, title FROM polls", [])
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
  db
    .any(
      "SELECT p.title, o.id AS option_id, o.name, o.value FROM polls AS p INNER JOIN options AS o ON p.id = o.poll_id WHERE p.id = $1",
      [req.params.poll_id]
    )
    .then(data => {
      const obj = {};
      obj.title = data[0].title;
      options = data.map(option => {
        return {
          option_id: option.option_id,
          name: option.name,
          value: option.value
        };
      });
      obj.options = options;
      res.status(200);
      return res.send(obj);
    })
    .catch(err => {
      res.status(500);
      return res.send(err);
    });
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
      const values = JSON.parse(options).map(option => {
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
        return res.status(204);
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
  const { deletedOptions, addedOptions } = req.body;

  const delOptionsJSON =
    deletedOptions === undefined ? undefined : JSON.parse(deletedOptions);
  const addOptionsJSON =
    addedOptions === undefined ? undefined : JSON.parse(addedOptions);
  if (delOptionsJSON && delOptionsJSON.length >= 1) {
    // remove values from options
    delOptionsJSON.forEach(id => {
      if (!isNaN(id)) {
        return db.none("DELETE FROM options WHERE id = $1", [id]);
      }
    });
  }
  if (addOptionsJSON && addOptionsJSON.length >= 1) {
    const poll_id = req.params.poll_id;
    addOptionsJSON.forEach(name => {
      return db.none("INSERT INTO options (poll_id, name) VALUES ($1, $2)", [
        poll_id,
        name
      ]);
    });
  }
  res.status(204);
  return res.json({});
};

exports.polls_vote = (req, res) => {
  const poll_id = req.params.poll_id;
  const { option_id } = req.body;
  if (!option_id) {
    res.status(400);
    res.json({
      status: "fail",
      data: "Missing option"
    });
  }

  db
    .task(async t => {
      const nothing = t.none(
        "UPDATE options SET value = value + 1 WHERE id = $1",
        [option_id]
      );
      return await t.any(
        "SELECT id, name, value FROM options WHERE poll_id = $1",
        [poll_id]
      );
    })
    .then(data => {
      res.status(200);
      return res.json({
        status: "success",
        data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      return res.json({
        status: "error",
        data: "server error"
      });
    });
};
