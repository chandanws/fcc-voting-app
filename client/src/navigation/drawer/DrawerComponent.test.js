import React from "react";
import DrawerComponent from "./DrawerComponent";
import { shallow } from "enzyme";

describe("<DrawerComponent />", () => {
  it("should render correclty", () => {
    const wrapper = shallow(<DrawerComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
