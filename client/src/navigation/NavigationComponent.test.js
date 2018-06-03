import React from "react";
import { shallow } from "enzyme";
import Navigation from "./NavigationComponent";
import Appbar from "./appbar/AppbarComponent";
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

  it("clicking toggledrawer should change state", () => {
    expect(wrapper.state().drawerOpen).toBe(false);
    wrapper.instance().toggleDrawer();
    wrapper.update();
    expect(wrapper.state().drawerOpen).toBe(true);
    wrapper.instance().toggleDrawer();
    wrapper.update();
    expect(wrapper.state().drawerOpen).toBe(false);
  });
});
