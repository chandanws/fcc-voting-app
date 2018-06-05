import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export const WithAuth = ({ component: Component, isLogged, ...rest }) => (
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

WithAuth.propTypes = {
  isLogged: PropTypes.bool
};

WithAuth.defaultProps = {
  isLogged: false
};
