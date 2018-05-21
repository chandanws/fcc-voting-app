const app = require("../../app");
const request = require("supertest");
const db = require("../../database").db;
const helpers = require("../../helpers");

describe("register", () => {
  beforeEach(() => {
    return db.none("TRUNCATE users RESTART IDENTITY CASCADE");
  });

  it("should create new user", () => {
    const username = "randomusername";
    const password = "grumbo";
    return request(app)
      .post("/auth/register")
      .send({ username, password })
      .then(res => {
        expect(res.statusCode).toBe(201);
        expect(res.get("Authorization")).toBeDefined();
        const token = res.get("Authorization").split(" ")[1];
        const data = helpers.decodeJWT(token).data;
        expect(data).toHaveProperty("username", username);
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

describe("login", () => {
  beforeAll(() => {
    const wrongUser = "brumbo";
    const wrongPassword = "goba";
    const rightUser = "user1";
    const rightPassword = "pass";
  });

  it("should return 400 when password missing", () => {
    return request(app)
      .post("/auth/login")
      .send({ username: "wrongUser" })
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });

  it("should return 400 when username missing", () => {
    return request(app)
      .post("/auth/login")
      .send({ password: "wrongPass" })
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });

  // it("should return 400 when username or password is incorrect", () => {

  // })

  // it("should return 204 and send JWT in authorization when correct", () => {

  // })
});
