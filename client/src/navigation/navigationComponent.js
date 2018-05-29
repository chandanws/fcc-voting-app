import React from "react";
import Appbar from "./appbar/Appbar";
import DrawerComponent from "./drawer/DrawerComponent";
import "./NavigationComponent.css";

const Navigation = props => {
  return (
    <div className="navigation">
      <Appbar />
      <DrawerComponent />
    </div>
  );
};
export default Navigation;
