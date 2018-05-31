import { useModifierWithBlock, toggleElementInArray } from "./helpers";

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
