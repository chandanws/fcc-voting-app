import React from "react";
import Appbar from "./appbar/Appbar";
import DrawerComponent from "./drawer/DrawerComponent";

const Navigation = props => {
  return (
    <div>
      <Appbar />
      <DrawerComponent />
    </div>
  );
};
export default Navigation;
