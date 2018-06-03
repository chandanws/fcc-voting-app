import React from "react";
import PropTypes from "prop-types";
import "./FormComponent.css";
import { useModifierWithBlock } from "../helpers/helpers";

export const Form = ({ children, className, ...props }) => {
  return (
    <form className={`form ${className}`} {...props}>
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
