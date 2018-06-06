const request = require("supertest");
const app = require("../../app");
const db = require("../../database").db;
const pgp = require("../../database").pgp;
const mocks = require("../../helpers/mocks");

// TODO problem with all tests because all users are truncated
// Add users in beforeeach

describe("polls controller", () => {
  let token;
  beforeEach(() => {
    return mocks.setupDatabase(db).then(async () => {
      token = await mocks.getToken(app, "admin", "password");
    });
  });

  describe("polls_list", () => {
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
          expect(res.body.data.length).toBe(2);
          expect(res.body.data[0].id).toBe(1);
          expect(res.body.data[0].title).toBe("Title by admin");
          expect(res.body.data[1].title).toBe("Title by user");
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
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "first poll by admin" })
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    it("should create poll ", () => {
      return request(app)
        .post("/polls")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "first right poll",
          options: '["one", "five", "dog", "cat"]'
        })
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.get("Location")).toBeDefined();
          expect(res.get("Location")).toBe(`/polls/${res.body.data.id}`);
        });
    });
  });
  it("should not create options when poll data is missing", () => {
    return request(app)
      .post("/polls")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "first right poll"
      })
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });

  describe("polls_delete", () => {
    it("should delete a poll and respond with 204", () => {
      return request(app)
        .delete("/polls/1")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(204);
        })
        .catch(e => console.log(e));
    });

    it("should respond with 400 when poll doesn't exist", () => {
      return request(app)
        .delete("/polls/7")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    it("should not delete when not right user", () => {
      return request(app)
        .delete("/polls/2")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe("polls_detail", () => {});

  describe("polls_update", () => {});

  describe("polls_vote", () => {});
});
