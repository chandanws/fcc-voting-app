import React from "react";
import "./DrawerComponent.css";
import { useModifierWithBlock } from "../../helpers/helpers";
const DrawerComponent = props => {
  const modifiers = props.drawerOpen ? [] : ["hidden"];
  const classesDrawer = useModifierWithBlock("drawer", modifiers);
  const classesNotDrawer = useModifierWithBlock("not-drawer", modifiers);
  return (
    <div className="drawer-wrapper">
      <div className={`drawer-base ${classesDrawer}`}>Drawer Component</div>
      <div
        onClick={props.toggleDrawer}
        className={`drawer-base ${classesNotDrawer}`}
      />
    </div>
  );
};

export default DrawerComponent;
