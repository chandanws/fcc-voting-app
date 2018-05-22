const helpers = require("./index");

describe("helpers", () => {
  describe("decodeJWT", () => {
    it("should return object payload", () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidXNlcjEiLCJpZCI6Mn0sImV4cCI6MTUyNjkyNDc3NiwiaWF0IjoxNTI2OTIxMTc2fQ.F9wdQEL3rlNxNQhXDOYGH2508CtvU-Xa-ZznobX5368";
      const data = helpers.decodeJWT(token).data;
      expect(data).toEqual({ id: 2, username: "user1" });
    });
  });

  describe("generateSalt", () => {
    it("should return a length 16 string when supplied with value 16", () => {
      const string = helpers.generateSalt(16);
      expect(string.length).toBe(16);
    });
    it("should return different strings from different calls", () => {
      const string1 = helpers.generateSalt(16);
      const string2 = helpers.generateSalt(16);
      expect(string1).not.toBe(string2);
    });
  });
});
