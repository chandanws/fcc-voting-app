const response = require("./response");

describe("getList", () => {
  it("should return proper object", () => {
    const data = [{ name: "test", id: 1 }, { name: "user", id: 2 }];
    const mockObj = {
      status: "success",
      data: { polls: data }
    };
    expect(response.getList("polls", data)).toEqual(mockObj);
  });
});
