const app = require("../../app");
const request = require("supertest");
const db = require("../../database").db;

describe("register", () => {
  beforeEach(() => {
    return db.none("TRUNCATE users RESTART IDENTITY CASCADE");
  });

  it("should create new user", () => {
    return db
      .any("INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)", [
        "user2",
        "pass",
        "salt"
      ])
      .then(() => {
        return request(app)
          .post("/auth/register")
          .send({ username: "user1", password: "pass" })
          .then(res => {
            expect(res.statusCode).toBe(201);
          });
      });
  });

  it("should not create user when password is missing", () => {
    return request(app)
      .post("/auth/register")
      .send({ username: "user1" })
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status", "fail");
        expect(res.body).toHaveProperty("data", {
          password: "password is missing"
        });
      });
  });

  it("should not create user when username is missing", () => {
    return request(app)
      .post("/auth/register")
      .send({ password: "pass" })
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status", "fail");
        expect(res.body).toHaveProperty("data", {
          username: "username is missing"
        });
      });
  });

  it("should not create user when username already taken", () => {
    return db
      .any("INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)", [
        "user1",
        "pass",
        "salt"
      ])
      .then(() => {
        return request(app)
          .post("/auth/register")
          .send({ username: "user1", password: "pass" })
          .then(res => {
            expect(res.statusCode).toBe(409);
          });
      });
  });
});
