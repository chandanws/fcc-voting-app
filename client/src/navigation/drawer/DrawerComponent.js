import React from "react";
import "./DrawerComponent.css";
import { useModifierWithBlock } from "../../helpers/helpers";
const DrawerComponent = props => {
  const modifiers = props.drawerOpen ? [] : ["hidden"];
  const classesDrawer = useModifierWithBlock("drawer", modifiers);
  const classesNotDrawer = useModifierWithBlock("not-drawer", modifiers);
  console.log(classesNotDrawer);
  return (
    <div className="drawer-wrapper">
      <div className={classesDrawer}>Drawer Component</div>
      <div onClick={props.toggleDrawer} className={classesNotDrawer} />
    </div>
  );
};

export default DrawerComponent;
