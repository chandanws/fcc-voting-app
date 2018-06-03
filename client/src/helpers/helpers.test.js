import {
  useModifierWithBlock,
  toggleElementInArray,
  toggleObjectsInArray,
  removeElementFromArray,
  changeValueInArrayOfObjects
} from "./helpers";

describe("useModifierWithBlock", () => {
  it("should return button, when no modifier specified", () => {
    expect(useModifierWithBlock("button")).toBe("button");
  });

  it("should return button with modifiers", () => {
    expect(useModifierWithBlock("button", ["stroked", "ugly"])).toBe(
      "button button--stroked button--ugly"
    );
  });
});

describe("toggleElementInArray", () => {
  let oldArray;
  beforeAll(() => {
    oldArray = [1, 3, 5, 7];
  });
  it("should return added array if no element found", () => {
    expect(toggleElementInArray(oldArray, 2)).toEqual([...oldArray, 2]);
  });

  it("should return array with 1 value if initial array is empty", () => {
    const emptyArray = [];
    expect(toggleElementInArray(emptyArray, 1)).toEqual([...emptyArray, 1]);
  });

  it("should return proper array when index at 0", () => {
    expect(toggleElementInArray(oldArray, 1)).toEqual([3, 5, 7]);
  });

  it("should return proper array when index at 0", () => {
    expect(toggleElementInArray(oldArray, 7)).toEqual([1, 3, 5]);
  });
});

describe("toggleObjectInArray", () => {
  let oldArray;
  beforeAll(() => {
    oldArray = [
      { id: 1, value: "something" },
      { id: 2, value: "random" },
      { id: 3, value: "creepy" }
    ];
  });
  it("should return array with added object with passed id and empty string value if no element found", () => {
    expect(toggleObjectsInArray(oldArray, 4)).toEqual([
      ...oldArray,
      { id: 4, value: "" }
    ]);
  });

  it("should return array with 1 value if initial array is empty", () => {
    const emptyArray = [];
    expect(toggleObjectsInArray(emptyArray, 1)).toEqual([
      ...emptyArray,
      { id: 1, value: "" }
    ]);
  });

  it("should return proper array when index at 0", () => {
    expect(toggleObjectsInArray(oldArray, 1)).toEqual([
      { id: 2, value: "random" },
      { id: 3, value: "creepy" }
    ]);
  });

  it("should return proper array when index at max", () => {
    expect(toggleObjectsInArray(oldArray, 3)).toEqual([
      { id: 1, value: "something" },
      { id: 2, value: "random" }
    ]);
  });
});

describe("toggleObjectInArray", () => {
  let oldArray;
  beforeAll(() => {
    oldArray = [{ id: 1, value: "something" }, { id: 2, value: "something" }];
  });

  it("should change value in id 1", () => {
    expect(changeValueInArrayOfObjects(oldArray, 1, "newvalue")).toEqual([
      { id: 1, value: "newvalue" },
      { id: 2, value: "something" }
    ]);
  });

  it("should not change anything when object with specifid ID not in array", () => {
    expect(changeValueInArrayOfObjects(oldArray, 5, "newvalue")).toEqual(
      oldArray
    );
  });

  it("should return array with 1 value if initial array is empty", () => {
    const emptyArray = [];
    expect(toggleObjectsInArray(emptyArray, 1)).toEqual([
      ...emptyArray,
      { id: 1, value: "" }
    ]);
  });
});

describe("removeElementFromArray", () => {
  let oldArray;
  beforeAll(() => {
    oldArray = [1, 2, 3, 4];
  });

  it("should return same array when index too high", () => {
    expect(removeElementFromArray(oldArray, 7)).toEqual(oldArray);
  });

  it("should remove 1 when index is 0", () => {
    expect(removeElementFromArray(oldArray, 0)).toEqual([2, 3, 4]);
  });

  it("should remove 4 when index is 3", () => {
    expect(removeElementFromArray(oldArray, 3)).toEqual([1, 2, 3]);
  });
});
