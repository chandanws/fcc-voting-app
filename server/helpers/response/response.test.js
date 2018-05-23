const response = require("./response");

describe("getList", () => {
  it("should return proper object", () => {
    const data = [{ name: "test", id: 1 }, { name: "user", id: 2 }];
    const mockObj = {
      status: "success",
      data: { polls: data }
    };
    expect(response.getListSuccess("polls", data)).toEqual(mockObj);
  });

  it("should not equal", () => {
    const data1 = [{ name: "test", id: 1 }, { name: "cruizer", id: 2 }];
    const data2 = [{ name: "test", id: 1 }, { name: "user", id: 2 }];
    const mockObj = {
      status: "success",
      data: { polls: data1 }
    };
    expect(response.getListSuccess("polls", data2)).not.toEqual(mockObj);
  });
});
