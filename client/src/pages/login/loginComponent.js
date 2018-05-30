import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { FormElement, Form } from "../../form/FormComponent";

class LoginComponent extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    // do something with redux later
    console.log(this.state);
  };

  handleChange = id => event => {
    if (id === 1) {
      return this.setState({ username: event.target.value });
    } else {
      return this.setState({ password: event.target.value });
    }
  };

  render() {
    return (
      <div>
        <Typography component="h1" text="Login" />
        <Form onSubmit={this.handleSubmit}>
          <FormElement
            id={1}
            onChange={this.handleChange}
            value={this.state.username}
            label="username"
          />
          <FormElement
            id={2}
            onChange={this.handleChange}
            value={this.state.password}
            label="password"
            type="password"
          />
        </Form>
      </div>
    );
  }
}

export default LoginComponent;
