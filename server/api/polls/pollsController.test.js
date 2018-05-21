const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;

// TODO problem with all tests because all users are truncated
// Add users in beforeeach

describe("polls controller", () => {
  beforeEach(() => {
    return db.task("es7-task", async t => {
      const nothing = await t.none("TRUNCATE polls RESTART IDENTITY");
      const nothing3 = await t.none("TRUNCATE users RESTART IDENTITY CASCADE");
      const nothing2 = await t.none(
        "INSERT INTO users(username, hash, salt) VALUES (${username}, ${hash}, ${salt})",
        {
          username: "admin",
          hash: "pass",
          salt: "salt"
        }
      );
      return [];
    });
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
    it("should have proper parameters", () => {
      return request(app)
        .post("/polls")
        .send({
          user_id: 1,
          title: "Posted poll title"
        })
        .then(res => {
          expect(res.statusCode).toBe(201);
          const id = res.body.data.id;
          expect(res.get("Location")).toBe(`/polls/${id}`);
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
            .then(res => {
              expect(res.statusCode).toBe(204);
            });
        })
        .catch();
    });

    it("should respond with 409", () => {
      return request(app)
        .delete("/polls/1")
        .then(res => {
          expect(res.statusCode).toBe(409);
        });
    });
  });
});
