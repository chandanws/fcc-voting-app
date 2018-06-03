import React from "react";
import CommentContainer from "./CommentContainer";
import { shallow } from "enzyme";

describe("<CommentContainer />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<CommentContainer />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("toggleOpenReplies(id)", () => {
    beforeEach(() => {
      wrapper.setState({ openReplies: [{ id: 1, value: "nothing" }] });
    });
    it("should change state.openReplies", () => {
      wrapper.instance().toggleOpenReplies(1);
      wrapper.update();
      expect(wrapper.state().openReplies).toEqual([]);
      wrapper.instance().toggleOpenReplies(2);
      wrapper.update();
      expect(wrapper.state().openReplies).toEqual([{ id: 2, value: "" }]);
      wrapper.instance().toggleOpenReplies(1);
      wrapper.update();
      expect(wrapper.state().openReplies).toEqual([
        { id: 2, value: "" },
        { id: 1, value: "" }
      ]);
    });
  });

  describe("handleReplyState(id)(event)", () => {
    beforeEach(() => {
      wrapper.setState({ openReplies: [{ id: 1, value: "nothing" }] });
    });
    it("should change state.openReplies.value", () => {
      wrapper.instance().handleReplyState(1)({
        target: { value: "updatedValue" }
      });
      wrapper.update();
      expect(wrapper.state().openReplies).toEqual([
        { id: 1, value: "updatedValue" }
      ]);
    });
    it("should not change anything when id is wrong", () => {
      wrapper.instance().handleReplyState(7)({
        target: { value: "updatedValue" }
      });
      wrapper.update();
      expect(wrapper.state().openReplies).toEqual([
        { id: 1, value: "nothing" }
      ]);
    });
  });
});
