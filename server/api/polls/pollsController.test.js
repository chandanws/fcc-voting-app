const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;
const pgp = require("../../database").pgp;
const helpers = require("../../helpers");

// TODO problem with all tests because all users are truncated
// Add users in beforeeach

describe("polls controller", () => {
  let token;
  beforeAll(() => {
    return db
      .task("create user task", async t => {
        const salt = helpers.generateSalt(16);
        const obj = helpers.sha512("password", salt);
        const nothing3 = await t.none(
          "TRUNCATE users RESTART IDENTITY CASCADE"
        );
        const nothing2 = await t.none(
          "INSERT INTO users(username, hash, salt) VALUES (${username}, ${hash}, ${salt})",
          {
            username: "admin",
            hash: obj.hash,
            salt: obj.salt
          }
        );
        const nothing4 = await t.none(
          "INSERT INTO users(username, hash, salt) VALUES (${username}, ${hash}, ${salt})",
          {
            username: "admin1",
            hash: obj.hash,
            salt: obj.salt
          }
        );
        return [];
      })
      .then(() => {
        return request(app)
          .post("/auth/login")
          .send({ username: "admin", password: "password" })
          .then(res => {
            token = res.get("Authorization").split(" ")[1];
          });
      });
  });

  beforeEach(() => {
    return db.none("TRUNCATE polls RESTART IDENTITY CASCADE");
  });

  describe("polls_list", () => {
    beforeEach(() => {
      return db.tx(async t => {
        const poll = await t.one(
          "INSERT INTO polls(user_id, title) VALUES ($1, $2) RETURNING id",
          [1, "Example"]
        );
        const cs = new pgp.helpers.ColumnSet(["poll_id", "name"], {
          table: "options"
        });
        const options = ["option1", "dog", "cat", "user"];
        const values = options.map(option => {
          return { poll_id: poll.id, name: option };
        });
        const query = pgp.helpers.insert(values, cs);
        const nothing = await t.none(query);
      });
    });

    it("get polls_list", () => {
      return request(app)
        .get("/polls")
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.get("Content-Type")).toBe(
            "application/json; charset=utf-8"
          );
          expect(res.body).toHaveProperty("status", "success");
          expect(res.body).toHaveProperty("data");
          expect(res.body.data.length).toBe(1);
          expect(res.body.data[0].id).toBe(1);
          expect(res.body.data[0].title).toBe("Example");
        });
    });
  });

  describe("polls_create", () => {
    it("should return 401 if JWT not provided", () => {
      return request(app)
        .post("/polls")
        .then(res => {
          expect(res.statusCode).toBe(401);
        });
    });

    it("should return 400 with less than 2 options supplied ", () => {
      return request(app)
        .post("/polls")
        .send({ title: "first poll by admin" })
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    // it("should not create options when poll data is missing", () => {});

    // it("should not create a poll when options are not created", () => {});

    it("should create options when creating a poll", () => {
      return request(app)
        .post("/polls")
        .send({
          title: "first right poll",
          options: '["one", "five", "dog", "cat"]'
        })
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.get("Location")).toBeDefined();
          expect(res.get("Location")).toBe(`/polls/${res.body.data.id}`);

          db
            .any("SELECT name FROM options WHERE poll_id = $1", [
              res.body.data.id
            ])
            .then(data => {
              console.log(data);
            })
            .catch(e => {
              console.log(options);
            });
        });
    });
  });

  describe("polls_delete", () => {
    it("should delete a poll and respond with 204", () => {
      return db
        .none("INSERT INTO polls(user_id, title) VALUES ($1, $2)", [
          1,
          "Example"
        ])
        .then(() => {
          return request(app)
            .delete("/polls/1")
            .set("Authorization", `Bearer ${token}`)
            .then(res => {
              expect(res.statusCode).toBe(204);
            });
        })
        .catch();
    });

    it("should respond with 400 when poll doesn't exist", () => {
      return request(app)
        .delete("/polls/1")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    // TODO create this one
    it("should not delete when not right user", () => {
      return request(app)
        .post("/auth/login")
        .send({ username: "admin1", password: "password" })
        .then(res => {
          token2 = res.get("Authorization").split(" ")[1];
          return token2;
        })
        .then(token2 => {
          return request(app)
            .delete("/polls/1")
            .set("Authorization", `Bearer ${token2}`)
            .then(res => {
              expect(res.statusCode).toBe(400);
            });
        });
    });
  });
});
