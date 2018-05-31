import React, { Component } from "react";
import PropTypes from "prop-types";
import { useModifierWithBlock } from "../helpers/helpers";
import "./ListComponent.css";

export const ListItem = ({ children, modifiers }) => {
  const classes = useModifierWithBlock("list__item", modifiers);
  return <li className={`${classes}`}>{children}</li>;
};

ListItem.propTypes = {
  modifiers: PropTypes.arrayOf(PropTypes.string)
};

ListItem.defaultProps = {
  modifiers: []
};

const List = ({ children, modifiers }) => {
  const classes = useModifierWithBlock("list", modifiers);
  return <ul className={`${classes}`}>{children}</ul>;
};

List.propTypes = {
  modifiers: PropTypes.arrayOf(PropTypes.string)
};

List.defaultProps = {
  modifiers: []
};

export default List;
