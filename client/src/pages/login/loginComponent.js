import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { Button } from "../../button/ButtonComponent";
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Typography component="h1" text="Login" />
        <Form onSubmit={this.handleSubmit}>
          <FormElement
            onChange={this.handleChange}
            value={this.state.username}
            label="username"
          />
          <FormElement
            onChange={this.handleChange}
            value={this.state.password}
            label="password"
            type="password"
          />
          <input className="form__submit" type="submit" value="submit" />
        </Form>
      </div>
    );
  }
}

export default LoginComponent;
