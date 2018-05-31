import React from "react";
import RegisterComponent from "./registerComponent";
import { shallow } from "enzyme";

describe("<RegisterComponent />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<RegisterComponent />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleChange", () => {});

  describe("handleSubmit", () => {});
});
