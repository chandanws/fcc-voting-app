import React from "react";
import { shallow } from "enzyme";
import Navigation from "./navigationComponent";
import Appbar from "./appbar/Appbar";

describe("<Navigation />", () => {
  it("should have one <Appbar />", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find(Appbar).length).toBe(1);
  });
});
