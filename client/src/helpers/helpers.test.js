import { useModifierWithBlock } from "./helpers";

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
