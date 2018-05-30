import React from "react";
import "./DrawerComponent.css";
import { useModifierWithBlock } from "../../helpers/helpers";
const DrawerComponent = props => {
  const modifiers = props.drawerOpen ? [] : ["hidden"];
  const classes = useModifierWithBlock("drawer", modifiers);
  return <div className={classes}>Drawer Component</div>;
};

export default DrawerComponent;
