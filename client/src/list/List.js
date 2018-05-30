import React, { Component } from "react";
import "./List.css";

export const ListItem = ({ children }) => {
  return <li className="list__item">{children}</li>;
};

class List extends Component {
  static Item = ListItem;
  render() {
    return <ul className="list">{this.props.children}</ul>;
  }
}

export default List;
