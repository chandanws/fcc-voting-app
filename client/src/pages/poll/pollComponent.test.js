import React from "react";
import PollComponent from "./PollComponent";
import { shallow } from "enzyme";

describe("<PollComponent />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<PollComponent />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleChange", () => {
    it("should change state based on selected value", () => {
      wrapper.instance().handleChange({ target: { value: "user" } });
      wrapper.update();
      expect(wrapper.state().value).toBe("user");
    });
  });

  describe("handleSubmit", () => {});
});
