import React from "react";
import { Form, FormElement } from "./FormComponent";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("<Form />", () => {
  it("should render correctly", () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<Form onSubmit={mockCallback} />);
    expect(wrapper).toMatchSnapshot();
  });
});

// describe("<FormElement />", () => {});
