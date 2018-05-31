import React from "react";
import Appbar from "./AppbarComponent";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("<Appbar />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Appbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
