import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { Form, FormElement } from "../../form/FormComponent";

class RegisterComponent extends Component {
  state = {
    username: "",
    passwordOne: "",
    passwordTwo: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    // do something with redux later
    console.log(this.state);
  };

  handleChange = id => event => {
    if (id === 2) {
      this.setState({ passwordOne: event.target.value });
    } else if (id === 3) {
      this.setState({ passwordTwo: event.target.value });
    } else {
      this.setState({ username: event.target.value });
    }
  };

  render() {
    return (
      <div>
        <Typography component="h1" text="Register" />
        <Form onSubmit={this.handleSubmit}>
          <FormElement
            id={1}
            validation={this.state.username.length > 5}
            onChange={this.handleChange}
            value={this.state.username}
            label="username"
          />
          <FormElement
            id={2}
            validation={this.state.passwordOne.length > 5}
            onChange={this.handleChange}
            value={this.state.passwordOne}
            label="password"
            type="password"
          />
          <FormElement
            id={3}
            validation={this.state.passwordOne === this.state.passwordTwo}
            onChange={this.handleChange}
            value={this.state.passwordTwo}
            label="password"
            type="password"
          />
        </Form>
      </div>
    );
  }
}

export default RegisterComponent;
