import React from "react";
import List, { ListItem } from "./ListComponent";
import { shallow } from "enzyme";

describe("<List />", () => {
  it("should make correct list items", () => {
    const wrapper = shallow(
      <List>
        <ListItem>2</ListItem>
        <ListItem>3</ListItem>
        <ListItem>4</ListItem>
      </List>
    );
    // what next
  });
});
