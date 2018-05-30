import React from "react";
import { Typography } from "../../Typography/Typography";
import List, { ListItem } from "../../list/List";
import { Button } from "../../button/ButtonComponent";
import { Link } from "react-router-dom";

const HomepageComponent = props => {
  return (
    <div>
      <Typography component="h1" text="All polls" />
      <List modifiers={["bordered"]}>
        <ListItem>
          <Button component={Link} to="/polls/1" modifiers={["align-left"]}>
            Test
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/polls/2" modifiers={["align-left"]}>
            Test
          </Button>
        </ListItem>
        <ListItem>
          <Button component={Link} to="/polls/3" modifiers={["align-left"]}>
            Test
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default HomepageComponent;
