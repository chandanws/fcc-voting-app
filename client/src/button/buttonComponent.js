import React from "react";
import PropTypes from "prop-types";
import "./ButtonComponent.css";

export const Button = ({
  component: Component,
  children,
  className,
  ...props
}) => {
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
  className: ""
};
