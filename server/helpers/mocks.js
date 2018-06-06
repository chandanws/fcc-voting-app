const helpers = require("./index");
const request = require("supertest");

function setupDatabase(db) {
  const salt = helpers.generateSalt(16);
  const obj = helpers.sha512("password", salt);

  const options = [
    { poll_id: 1, name: "Actor1Option" },
    { poll_id: 1, name: "Actor2Option" },
    { poll_id: 1, name: "Actor3Option" },
    { poll_id: 1, name: "Actor4Option" },
    { poll_id: 2, name: "user1Option" },
    { poll_id: 2, name: "user2Option" },
    { poll_id: 2, name: "user3Option" },
    { poll_id: 2, name: "user4Option" }
  ];

  const comments = [
    { user_id: 1, poll_id: 1, parent_id: null, body: "0.1" },
    { user_id: 1, poll_id: 1, parent_id: null, body: "0.2" },
    { user_id: 1, poll_id: 1, parent_id: 1, body: "1.1" },
    { user_id: 1, poll_id: 1, parent_id: null, body: "0.3" }
  ];

  return db.task(async t1 => {
    const clear = await t1.none("TRUNCATE users RESTART IDENTITY CASCADE");
    const admin = await t1.one(
      "INSERT INTO users(username, hash, salt) VALUES ($1, $2, $3) RETURNING id",
      ["admin", obj.hash, obj.salt]
    );
    const user = await t1.one(
      "INSERT INTO users(username, hash, salt) VALUES ($1, $2, $3) RETURNING id",
      ["user", obj.hash, obj.salt]
    );
    const poll1 = await t1.one(
      "INSERT INTO polls(user_id, title) VALUES ($1, $2) RETURNING id",
      [admin.id, "Title by admin"]
    );
    const poll2 = await t1.one(
      "INSERT INTO polls(user_id, title) VALUES ($1, $2) RETURNING id",
      [user.id, "Title by user"]
    );
    t1.tx(t => {
      const queries = options.map(option =>
        t.none(
          "INSERT INTO options(poll_id, name) VALUES (${poll_id}, ${name})",
          option
        )
      );
    });
    t1.tx(t => {
      const queries = comments.map(comments =>
        t.none(
          "INSERT INTO comments(user_id, poll_id, parent_id, body) VALUES (${user_id}, ${poll_id}, ${parent_id}, ${body})",
          comments
        )
      );
    });
    return [];
  });
}

function getToken(app, username, password) {
  return request(app)
    .post("/auth/login")
    .send({ username, password })
    .then(res => {
      token = res.get("Authorization").split(" ")[1];
      return token;
    });
}

module.exports = {
  setupDatabase,
  getToken
};
