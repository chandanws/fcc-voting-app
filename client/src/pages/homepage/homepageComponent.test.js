import React from "react";
import HomepageComponent from "./homepageComponent";
import { shallow } from "enzyme";

describe("<HomepageComponent />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<HomepageComponent />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
