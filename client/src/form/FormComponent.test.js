import React from "react";
import { Form, FormElement } from "./FormComponent";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("<Form />", () => {
  const wrapper = shallow(<Form />).toJson();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe("<FormElement />", () => {});
