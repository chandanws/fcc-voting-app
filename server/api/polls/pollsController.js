const db = require("../../database").db;
const pgp = require("../../database").pgp;
const response = require("../../helpers/response");
const helpers = require("../../helpers");

exports.polls_list = (req, res) => {
  db.any("SELECT id, title FROM polls", [])
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
  db.any(
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
  if (title === undefined || title === "") {
    res.status(400);
    res.set("Content-Type", "application/json");
    return res.json({ status: "fail", message: "A title is required" });
  }

  if (options === undefined || options.length < 2) {
    res.status(400);
    res.set("Content-Type", "application/json");
    return res.json({ status: "fail", message: "Minimum options: 2" });
  }

  if (options.includes("")) {
    res.status(400);
    res.set("Content-Type", "application/json");
    return res.json({
      status: "fail",
      message: "Option with no value not allowed"
    });
  }

  db.tx(async t => {
    return t
      .one("INSERT INTO polls (user_id, title) VALUES ($1, $2) RETURNING id", [
        res.locals.id,
        title
      ])
      .then(poll => {
        const cs = new pgp.helpers.ColumnSet(["poll_id", "name"], {
          table: "options"
        });
        const values = options.map(option => {
          return { poll_id: poll.id, name: option };
        });
        const query = pgp.helpers.insert(values, cs);
        return t.none(query).then(() => {
          return { id: poll.id };
        });
      });
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
  db.result("DELETE FROM polls WHERE id = $1 AND user_id = $2", [
    req.params.poll_id,
    res.locals.id
  ])
    .then(result => {
      if (result.rowCount === 1) {
        return res.status(204).send();
      } else {
        res.status(400);
        return res.json({
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
        return db
          .none("DELETE FROM options WHERE id = $1", [id])
          .then()
          .catch(e => console.log(e));
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

  db.task(async t => {
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
      return res.status(200).send({});
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

exports.polls_comments_list = (req, res) => {
  db.any("SELECT * FROM comments WHERE poll_id = $1", [req.params.poll_id])
    .then(data => {
      return res.status(200).send({ data: helpers.makeTree({ q: data }) });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).send("error");
    });
};

exports.polls_comments_create = (req, res) => {
  if (req.body.parent_id === undefined || req.body.text === undefined) {
    return res.status(400).send({});
  }

  db.any(
    "INSERT INTO comments (user_id, poll_id, parent_id, body) VALUES ($1, $2, $3, $4)",
    [res.locals.id, req.params.poll_id, req.body.parent_id, req.body.text]
  )
    .then(data => {
      return res.status(201).send({});
    })
    .catch(e => {
      console.log(e);
      return res.status(500).send({ status: "error", message: e });
    });
};

exports.polls_comments_update = (req, res) => {
  db.none(
    "UPDATE comments SET body = $1 WHERE comment_id = $2 and user_id = $3",
    [req.body.text, req.params.comment_id, res.locals.id]
  )
    .then(() => res.status(204).send({}))
    .catch(e => {
      console.log(e);
      return res.status(500).send({ status: "error", message: e });
    });
};
