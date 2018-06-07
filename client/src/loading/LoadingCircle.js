import React from "react";
import "./LoadingCircle.css";

export const LoadingWrapper = ({ children }) => {
  return <div className="loading-circle-wrapper">{children}</div>;
};

export const LoadingCircle = () => {
  return <div className="loading-circle" />;
};
