const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;

describe("polls controller", () => {
  beforeEach(() => {
    return db.none("TRUNCATE polls RESTART IDENTITY");
  });

  describe("polls_list", () => {
    beforeEach(() => {
      db.none("INSERT INTO polls(user_id, title) VALUES ($1, $2)", [
        1,
        "Example"
      ]);
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
          console.log(res.body);
          expect(res.statusCode).toBe(201);
          const id = res.body.data.id;
          expect(res.get("Location")).toBe(`/polls/${id}`);
        });
    });
  });
});
