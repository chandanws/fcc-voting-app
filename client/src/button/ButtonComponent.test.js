import React from "react";
import { shallow } from "enzyme";
import { Button } from "./buttonComponent";

describe("<Button />", () => {
  it("should have default <button> when no tag supplied", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find("button").length).toBe(1);
  });

  it("should have <a> when a supplied", () => {
    const wrapper = shallow(<Button component="a" />);
    expect(wrapper.find("a").length).toBe(1);
  });

  it("should have proper classNames", () => {
    const wrapper = shallow(
      <Button
        modifiers={["stroked", "weird", "danger"]}
        className={"custom-class name"}
      />
    );
    expect(
      wrapper.hasClass(
        "button button--stroked button--weird button--danger custom-class name"
      )
    ).toBe(true);
  });
});
