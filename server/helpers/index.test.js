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

  describe("sha512", () => {
    const hash =
      "dd355475c22ced0f78bea94067b2566499bc0150c9e72fe1576e7edec3d8e6307e56ce47f71f2a182247f6c3bd72186f074d19917c44399dd22d720c85ca03c1";
    const salt = "97afcffe4642da98";

    it("should return correct hash when used with salt", () => {
      const data = helpers.sha512("password", salt);
      expect(hash).toBe(data.hash);
    });
  });
});
