import React from "react";
import { Typography } from "../../Typography/Typography";
import List, { ListItem } from "../../list/List";
import { Button } from "../../button/ButtonComponent";

const HomepageComponent = props => {
  return (
    <div>
      <Typography component="h1" text="All polls" />
      <List>
        <ListItem>
          <Button modifiers={["align-left"]}>Test</Button>
        </ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
      </List>
    </div>
  );
};

export default HomepageComponent;
