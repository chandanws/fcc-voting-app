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

  describe("polls_detail", () => {
    it("should have proper body", () => {
      return request(app)
        .get("/polls/1")
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("title", "Title by admin");
          expect(res.body).toHaveProperty("options");
        });
    });
  });

  describe("polls_update", () => {
    it("should remove option", () => {
      return request(app)
        .put("/polls/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ deletedOptions: "[1, 2]" })
        .then(res => {
          expect(res.statusCode).toBe(204);
          return request(app)
            .get("/polls/1")
            .then(res2 => {
              expect(res2.body.options.length).toBe(3);
            });
        });
    });
  });

  describe("polls_vote", () => {
    it("should change options value when vote is successful", () => {
      return request(app)
        .put("/polls/1/vote")
        .send({ option_id: 1 })
        .then(res => {
          expect(res.statusCode).toBe(200);
          return request(app)
            .get("/polls/1")
            .then(res2 => {
              let value = 0;
              const options = res2.body.options;
              for (let i = 0; i < options.length; i++) {
                if (options[i].option_id === 1) {
                  value = 1;
                }
              }
              expect(value).toBe(1);
            });
        });
    });
  });

  describe("polls_comments_list", () => {
    it("should return comments in proper tree format", () => {
      return request(app)
        .get("/polls/1/comments")
        .then(res => {
          expect(res.body.data[0].body).toBe("0.1");
        });
    });
  });

  describe("create comment", () => {
    it("should create new comment", () => {
      return request(app)
        .post("/polls/2/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "newly created comment", parent_id: null })
        .then(res => {
          expect(res.statusCode).toBe(201);
          return request(app)
            .get("/polls/2/comments")
            .then(res => {
              expect(res.body.data[0].body).toBe("newly created comment");
            });
        });
    });

    it("should not create comment when parent_id is missing", () => {
      return request(app)
        .post("/polls/2/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "newly created comment" })
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });

    it("should not create comment when text is missing", () => {
      return request(app)
        .post("/polls/2/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ parent_id: null })
        .then(res => {
          expect(res.statusCode).toBe(400);
        });
    });
  });

  describe("edit comment", () => {
    it("should edit the comment when proper user", () => {
      return request(app)
        .put("/polls/1/comments/2")
        .set("Authorization", `Bearer ${token}`)
        .send({ text: "updated comment" })
        .then(res => {
          expect(res.statusCode).toBe(204);
          return request(app)
            .get("/polls/1/comments")
            .then(res => {
              let value = "";
              const comments = res.body.data;
              for (let i = 0; i < comments.length; i++) {
                if (comments[i].comment_id === 2) {
                  value = comments[i].body;
                }
              }
              expect(value).toBe("updated comment");
            });
        });
    });
  });
});
