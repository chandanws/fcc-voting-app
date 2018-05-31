import React from "react";
import List, { ListItem } from "./List";
import { shallow } from "enzyme";

describe("<List />", () => {
  it("should make correct list items", () => {
    const wrapper = shallow(
      <List>
        <List.Item>1</List.Item>
        <ListItem>2</ListItem>
        <ListItem>3</ListItem>
        <ListItem>4</ListItem>
      </List>
    );
    // what next
  });
});
