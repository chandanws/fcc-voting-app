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
});
