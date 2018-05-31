import {
  useModifierWithBlock,
  toggleElementInArray,
  removeElementFromArray
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
