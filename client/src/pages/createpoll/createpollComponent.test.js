import React from "react";
import CreatePollComponent from "./createpollComponent";
import { shallow } from "enzyme";

describe("<CreatePollComponent />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreatePollComponent />);
    wrapper.setState({ options: ["option1", "option2", "option3"] });
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleOptionsChange", () => {
    it("should change options state based on option change", () => {
      wrapper.instance().handleOptionsChange(0)({
        target: { value: "newOption1" }
      });
      wrapper.update();
      expect(wrapper.state().options[0]).toBe("newOption1");
      expect(wrapper.state().options).toEqual([
        "newOption1",
        "option2",
        "option3"
      ]);
    });

    it("should not change state when index too high", () => {
      wrapper.instance().handleOptionsChange(7)({
        target: { value: "newOption1" }
      });
      wrapper.update();
      expect(wrapper.state().options).toEqual([
        "option1",
        "option2",
        "option3"
      ]);
    });
  });

  describe("handleTitleChange", () => {});

  describe("removeOption", () => {
    it("should remove the specified option by index", () => {
      wrapper.instance().removeOption(0);
      wrapper.update();
      expect(wrapper.state().options).toEqual(["option2", "option3"]);
    });
  });

  describe("addOption", () => {
    it("should add new option at the end of array", () => {
      wrapper.instance().addOption();
      wrapper.update();
      expect(wrapper.state().options.length).toBe(4);
      expect(wrapper.state().options[3]).toBe("");
    });
  });

  describe("handleSubmit", () => {});
});
