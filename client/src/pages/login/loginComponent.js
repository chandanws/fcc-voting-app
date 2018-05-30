import React from "react";
import { Typography } from "../../Typography/Typography";
import { Button } from "../../button/ButtonComponent";
import "./loginComponent.css";

const LoginComponent = props => {
  return (
    <div>
      <Typography component="h1" text="Login" />
      <form className="form">
        <div className="form__wrapper">
          <label className="form__label">Username</label>
          <input
            className="form__input"
            type="text"
            placeholder="randomuser1"
          />
        </div>
        <div className="form__wrapper">
          <label className="form__label">Password</label>
          <input className="form__input" type="password" />
        </div>
        <input className="form__submit" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginComponent;
