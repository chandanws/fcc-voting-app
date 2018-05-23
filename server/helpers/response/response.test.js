const response = require("./response");

describe("getList", () => {
  let data, data1, mockObj;
  beforeAll(() => {
    data = [{ name: "test", id: 1 }, { name: "user", id: 2 }];
    data1 = [{ name: "test", id: 1 }, { name: "cruizer", id: 2 }];
    mockObj = {
      status: "success",
      data: { polls: data }
    };
  });
  it("should return proper object", () => {
    expect(response.successGET("polls", data)).toEqual(mockObj);
  });

  it("should not equal", () => {
    expect(response.successGET("polls", data1)).not.toEqual(mockObj);
  });
});

describe("failPOST", () => {
  it("should return proper object", () => {
    const mockObj = {
      status: "fail",
      data: {
        username: "Missing username."
      }
    };
    expect(response.failPOST("username", "Missing username"));
  });
});

describe("serverError", () => {
  it("should return proper object", () => {
    const mockObj = {
      status: "error",
      message: "Unable to communicate with database"
    };
    expect(response.serverError("Unable to communicate with database")).toEqual(
      mockObj
    );
  });
});
