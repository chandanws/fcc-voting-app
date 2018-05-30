import React from "react";
import "./Typography.css";

export const Typography = ({
  component: Component,
  className,
  text,
  ...props
}) => {
  return <Component className={`typography--${Component}`}>{text}</Component>;
};

Typography.defaultProps = {
  component: "p"
};
