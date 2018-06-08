import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { FormElement, Form } from "../../form/FormComponent";
import { LoadingWrapper, LoadingCircle } from "../../loading/LoadingCircle";

class LoginComponent extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      username: "",
      password: ""
    });
  };

  handleChange = id => event => {
    if (id === 1) {
      return this.setState({ username: event.target.value });
    } else {
      return this.setState({ password: event.target.value });
    }
  };

  render() {
    const { loginState } = this.props;
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
          {loginState.fail && <div>{loginState.failMessage}</div>}
        </Form>
        {loginState.isChecking && (
          <LoadingWrapper>
            <LoadingCircle />
          </LoadingWrapper>
        )}
      </div>
    );
  }
}

export default LoginComponent;
