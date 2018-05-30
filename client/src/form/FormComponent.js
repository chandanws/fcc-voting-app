import React, { Component } from "react";
import PropTypes from "prop-types";
import "./FormComponent.css";

const FormContext = React.createContext([]);

export const Form = ({ children, ...props }) => {
  return (
    <form className="form" {...props}>
      {children}
      <input className="form__submit" type="submit" value="submit" />
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export const FormElement = ({ label, type, onChange, value, id }) => {
  return (
    <div className="form__wrapper">
      <label className="form__label">{label}</label>
      <input
        type={type}
        className="form__input"
        value={value}
        onChange={onChange(id)}
      />
    </div>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

FormElement.defaultProps = {
  type: "text"
};
