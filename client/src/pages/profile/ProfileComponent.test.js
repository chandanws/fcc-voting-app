import React from "react";
import ProfileComponent from "./ProfileComponent";
import { shallow } from "enzyme";

describe("<Profilecomponent />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<ProfileComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
