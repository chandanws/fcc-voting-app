import React from "react";
import DrawerComponent from "./DrawerComponent";
import { shallow } from "enzyme";

describe("<DrawerComponent />", () => {
  it("should havea div element with className drawer", () => {
    const wrapper = shallow(<DrawerComponent />);
    expect(wrapper.find(".drawer").length).toBe(1);
  });
});
