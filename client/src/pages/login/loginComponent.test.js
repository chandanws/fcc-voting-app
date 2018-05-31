import React from "react";
import LoginComponent from "./loginComponent";
import { shallow } from "enzyme";

describe("<HomepageComponent />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<LoginComponent />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calling handleChange should change state", () => {
    expect(wrapper.state().username).toBe("");
    expect(wrapper.state().password).toBe("");
    wrapper.instance().handleChange(1)({ target: { value: "username" } });
    wrapper.instance().handleChange(2)({ target: { value: "pass" } });
    wrapper.update();
    expect(wrapper.state().username).toBe("username");
    expect(wrapper.state().password).toBe("pass");
  });
});
