import React from "react";
import Appbar from "./Appbar";
import { shallow } from "enzyme";

describe("<Appbar />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Appbar />);
  });

  it("Should have 1 div ", () => {
    expect(wrapper.find("div").length).toBe(1);
  });
});
