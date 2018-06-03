import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { FormElement, Form } from "../../form/FormComponent";
import PropTypes from "prop-types";
import List, { ListItem } from "../../list/ListComponent";

export default class ProfileComponent extends Component {
  static defaultProps = {
    username: "Anonymous"
  };

  state = {
    passwordOld: "",
    passwordOne: "",
    passwordTwo: ""
  };

  handleChange = id => event => {
    if (id === 1) {
      return this.setState({ passwordOld: event.target.value });
    } else if (id === 2) {
      return this.setState({ passwordOne: event.target.value });
    } else {
      return this.setState({ passwordTwo: event.target.value });
    }
  };

  render() {
    return (
      <div>
        <Typography component="h1" text={`Hello ${this.props.username}`} />
        <hr />
        <Typography component="h2" text="Change password" />
        <Form onSubmit={e => e.preventDefault()}>
          <FormElement
            id={1}
            label="Old Password"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <FormElement
            id={2}
            label="New Password"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <FormElement
            id={3}
            label="New Password"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
        <Typography component="h2" text="Your polls" />
        <List modifiers={["bordered"]}>
          <ListItem>Poll1</ListItem>
          <ListItem>Poll1</ListItem>
          <ListItem>Poll1</ListItem>
        </List>
      </div>
    );
  }
}
