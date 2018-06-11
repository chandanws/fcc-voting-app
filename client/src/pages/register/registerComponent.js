import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { Form, FormElement } from "../../form/FormComponent";
import { debounce } from "../../helpers/helpers";

class RegisterComponent extends Component {
  state = {
    username: "",
    passwordOne: "",
    passwordTwo: ""
  };

  checkUsernameAvailability = debounce(username => {
    if (this.state.username.length >= 5) {
      this.props.checkUsernameAvailability(username);
    }
  }, 200);

  handleSubmit = event => {
    event.preventDefault();
    // do something with redux later
    console.log(this.state);
    this.props.login(
      this.state.username,
      this.state.passwordOne,
      "/auth/register"
    );
  };

  handleChange = id => event => {
    if (id === 2) {
      this.setState({ passwordOne: event.target.value });
    } else if (id === 3) {
      this.setState({ passwordTwo: event.target.value });
    } else {
      this.setState({ username: event.target.value });
      this.checkUsernameAvailability(event.target.value);
    }
  };

  render() {
    return (
      <div>
        <Typography component="h1" text="Register" />
        <Form onSubmit={this.handleSubmit}>
          <FormElement
            id={1}
            validation={
              this.state.username.length >= 5 && this.props.usernameAvailability
            }
            onChange={this.handleChange}
            value={this.state.username}
            label="username"
          />
          {this.state.username.length >= 5 && (
            <div>
              Username is {!this.props.usernameAvailability && "NOT"} available.
            </div>
          )}

          {this.state.username.length < 5 && (
            <div>Minimum username length: 5</div>
          )}
          <FormElement
            id={2}
            validation={
              this.state.passwordOne.length >= 5 &&
              this.state.passwordOne === this.state.passwordTwo
            }
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
          {this.state.passwordOne.length > 5 &&
            this.state.passwordOne !== this.state.passwordTwo && (
              <div>Passwords are not the same.</div>
            )}
        </Form>
      </div>
    );
  }
}

export default RegisterComponent;
