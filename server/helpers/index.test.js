const helpers = require("./index");

describe("helpers.decodeJWT", () => {
  it("should return object payload", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidXNlcjEiLCJpZCI6Mn0sImV4cCI6MTUyNjkyNDc3NiwiaWF0IjoxNTI2OTIxMTc2fQ.F9wdQEL3rlNxNQhXDOYGH2508CtvU-Xa-ZznobX5368";
    const data = helpers.decodeJWT(token).data;
    expect(data).toEqual({ id: 2, username: "user1" });
  });
});
