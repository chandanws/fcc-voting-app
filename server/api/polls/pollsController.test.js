const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;

describe("polls controller", () => {
  beforeEach(() => {
    return db.none("TRUNCATE polls RESTART IDENTITY");
  });

  describe("polls_list", () => {
    db.none("INSERT INTO polls(user_id, title) VALUES ($1, $2)", [
      1,
      "Example File"
    ]);

    it("what to type here", () => {
      return request(app)
        .get("/polls")
        .then(res => {
          console.log(res.body);
          expect(res.statusCode).toBe(200);
          expect(res.get("Content-Type")).toBe(
            "application/json; charset=utf-8"
          );
          expect(res.body).toHaveProperty("status", "success");
          expect(res.body).toHaveProperty("data");
        });
    });
  });
});
