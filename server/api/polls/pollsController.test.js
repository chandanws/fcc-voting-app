const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;
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
    return db.none("TRUNCATE polls RESTART IDENTITY");
  });

  describe("polls_list", () => {
    beforeEach(async () => {
      return await db.none(
        "INSERT INTO polls(user_id, title) VALUES ($1, $2)",
        [1, "Example"]
      );
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

    it("should return 201 when proper parameters", () => {
      return request(app)
        .post("/polls")
        .send({ title: "first poll by admin" })
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.get("Location")).toBeDefined();
          expect(res.get("Location")).toBe(`/polls/${res.body.data.id}`);
        });
    });

    // it("should have proper parameters", () => {
    //   return request(app)
    //     .post("/polls")
    //     .send({
    //       user_id: 1,
    //       title: "Posted poll title"
    //     })
    //     .then(res => {
    //       expect(res.statusCode).toBe(201);
    //       const id = res.body.data.id;
    //       expect(res.get("Location")).toBe(`/polls/${id}`);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // });
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
