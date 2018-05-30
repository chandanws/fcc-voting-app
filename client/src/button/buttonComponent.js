import React from "react";
import PropTypes from "prop-types";
import "./ButtonComponent.css";
import { useModifierWithBlock } from "../helpers/helpers";

export const Button = ({
  component: Component,
  children,
  className,
  modifiers,
  ...props
}) => {
  const classes = useModifierWithBlock("button", modifiers);
  return (
    <Component
      {...props}
      className={`button ${className}`}
      children={children}
    />
  );
};

Button.defaultProps = {
  component: "button",
  className: "",
  modifiers: []
};
