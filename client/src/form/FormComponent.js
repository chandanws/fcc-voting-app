import React from "react";
import PropTypes from "prop-types";
import "./FormComponent.css";
import { useModifierWithBlock } from "../helpers/helpers";

export const Form = ({ children, disabled, className, ...props }) => {
  const submit = disabled ? (
    <input disabled className="form__submit" type="submit" value="submit" />
  ) : (
    <input className="form__submit" type="submit" value="submit" />
  );
  return (
    <form className={`form ${className}`} {...props}>
      {children}
      {submit}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export const FormElement = ({
  component: Component,
  label,
  type,
  onChange,
  value,
  id,
  validation,
  children
}) => {
  let errorClassName;
  if (value === "" || validation === "") {
    errorClassName = "";
  } else if (validation === true) {
    errorClassName = "form__input--success";
  } else {
    errorClassName = "form__input--error";
  }

  return (
    <div className="form__wrapper">
      <label className="form__label">{label}</label>
      <div className="input-wrapper">
        <Component
          className={`form__input ${errorClassName}`}
          type={type}
          value={value}
          onChange={onChange(id)}
        />
        {children}
      </div>
    </div>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

FormElement.defaultProps = {
  type: "text",
  component: "input",
  validation: ""
};
