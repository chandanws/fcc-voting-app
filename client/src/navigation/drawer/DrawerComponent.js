import React from "react";
import "./DrawerComponent.css";
import { useModifierWithBlock } from "../../helpers/helpers";
import List, { ListItem } from "../../list/List";
import { Button } from "../../button/ButtonComponent";

const DrawerComponent = props => {
  const modifiers = props.drawerOpen ? [] : ["hidden"];
  const classesDrawer = useModifierWithBlock("drawer", modifiers);
  const classesNotDrawer = useModifierWithBlock("not-drawer", modifiers);

  // TODO: change later to use global logged in state
  const drawerList = true ? (
    <List>
      <ListItem>
        <Button>Profile</Button>
      </ListItem>
      <ListItem>
        <Button>New</Button>
      </ListItem>
      <ListItem>
        <Button>Logout</Button>
      </ListItem>
    </List>
  ) : (
    <List>
      <ListItem>
        <Button>Register</Button>
      </ListItem>
      <ListItem>
        <Button>Login</Button>
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
