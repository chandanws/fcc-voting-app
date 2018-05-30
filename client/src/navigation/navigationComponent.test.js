import React from "react";
import { shallow } from "enzyme";
import Navigation from "./NavigationComponent";
import Appbar from "./appbar/Appbar";
import DrawerComponent from "./drawer/DrawerComponent";

describe("<Navigation />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Navigation />);
  });

  it("should have one <Appbar />", () => {
    expect(wrapper.find(Appbar).length).toBe(1);
  });

  it("should have one <DrawerComponent />", () => {
    expect(wrapper.find(DrawerComponent).length).toBe(1);
  });

  it("should have one <div className='navigation'>", () => {
    expect(wrapper.find(".navigation").length).toBe(1);
  });
});
