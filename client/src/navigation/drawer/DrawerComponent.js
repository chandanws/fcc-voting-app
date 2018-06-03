import React from "react";
import "./DrawerComponent.css";
import { useModifierWithBlock } from "../../helpers/helpers";
import List, { ListItem } from "../../list/ListComponent";
import { Button } from "../../button/ButtonComponent";
import { Link } from "react-router-dom";

const DrawerComponent = props => {
  const modifiers = props.drawerOpen ? [] : ["hidden"];
  const classesDrawer = useModifierWithBlock("drawer", modifiers);
  const classesNotDrawer = useModifierWithBlock("not-drawer", modifiers);

  // TODO: change later to use global logged in state
  const drawerList = true ? (
    <List>
      <ListItem>
        <Button component={Link} to="/profile">
          Profile
        </Button>
      </ListItem>
      <ListItem>
        <Button component={Link} to="/polls/new">
          New
        </Button>
      </ListItem>
      <ListItem>
        <Button>Logout</Button>
      </ListItem>
    </List>
  ) : (
    <List>
      <ListItem>
        <Button component={Link} to="/register">
          Register
        </Button>
      </ListItem>
      <ListItem>
        <Button component={Link} to="/login">
          Login
        </Button>
      </ListItem>
    </List>
  );

  return (
    <div className="drawer-wrapper">
      <div className={`drawer-base ${classesDrawer}`}>{drawerList}</div>
      <div
        onClick={props.toggleDrawer}
        className={`drawer-base ${classesNotDrawer}`}
      />
    </div>
  );
};

export default DrawerComponent;
