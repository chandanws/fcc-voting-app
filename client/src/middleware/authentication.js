import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { LoadingWrapper, LoadingCircle } from "../loading/LoadingCircle";

export const WithAuth = ({
  component: Component,
  isLogged,
  isChecking,
  ...rest
}) => {
  if (isChecking) {
    return (
      <LoadingWrapper>
        <LoadingCircle />
      </LoadingWrapper>
    );
  }
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const WithoutLogIn = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

WithAuth.propTypes = {
  isLogged: PropTypes.bool
};

WithAuth.defaultProps = {
  isLogged: false
};
