const app = require("../../app");
const request = require("supertest");
const db = require("../../database").db;
const helpers = require("../../helpers");
const mocks = require("../../helpers/mocks");

describe("auth", () => {
  beforeEach(() => {
    return mocks.setupDatabase(db);
  });

  describe("register", () => {
    it("should create new user", () => {
      return request(app)
        .post("/auth/register")
        .send({ username: "randomusername", password: "grumbo" })
        .then(res => {
          expect(res.statusCode).toBe(201);
          expect(res.get("Authorization")).toBeDefined();
          const token = res.get("Authorization").split(" ")[1];
          const data = helpers.decodeJWT(token).data;
          expect(data).toHaveProperty("username", "randomusername");
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
            password: "Password is missing."
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
            username: "Username is missing."
          });
        });
    });
    it("should not create user when username already taken", () => {
      return request(app)
        .post("/auth/register")
        .send({ username: "admin", password: "pasasdss" })
        .then(res => {
          expect(res.statusCode).toBe(409);
        });
    });
  });

  describe("login", () => {
    it("should return 400 when password missing", () => {
      return request(app)
        .post("/auth/login")
        .send({ username: "user" })
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    it("should return 400 when username missing", () => {
      return request(app)
        .post("/auth/login")
        .send({ password: "password" })
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    it("should return 400 when username or password is incorrect", () => {
      return request(app)
        .post("/auth/login")
        .send({ username: "user", password: "Password2" })
        .then(res => {
          expect(res.statusCode).toBe(404);
        });
    });

    it("should return 204 and send JWT in authorization when correct", () => {
      return request(app)
        .post("/auth/login")
        .send({ username: "user", password: "password" })
        .then(res => {
          expect(res.statusCode).toBe(204);
          expect(res.get("Authorization")).toBeDefined();
        });
    });
  });
});
