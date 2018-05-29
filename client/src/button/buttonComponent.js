import React from "react";
import "./buttonComponent.css";
const Button = props => {
  const Component = props.component;
  return (
    <Component onClick={props.onClick} className="button">
      {props.value}
    </Component>
  );
};

export default Button;
