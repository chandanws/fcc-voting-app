import React from "react";
import { Button } from "../../button/ButtonComponent";
import { Link } from "react-router-dom";
import "./Appbar.css";

const Appbar = props => {
  return (
    <div className="appbar">
      <Button className="appbar__button">Menu</Button>
      {/* Later add component Link to button */}
      <Button className="appbar__button">Home</Button>
    </div>
  );
};

export default Appbar;
