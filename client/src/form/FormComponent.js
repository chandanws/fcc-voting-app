import React, { Component } from "react";
import PropTypes from "prop-types";

const FormContext = React.createContext([]);

export class Form extends Component {
  constructor(props) {
    super(props);

    let numberOfInputs = React.Children.count(this.props.children) - 1; // last one is submit button
    const values = this.createState(numberOfInputs);
    this.state = { values };
  }

  createState = value => {
    let values = [];

    let numberOfInputs = React.Children.count(this.props.children) - 1; // last one is submit button
    for (let i = 0; i < numberOfInputs; i++) {
      values = values.concat({ id: i, value: "" });
    }
    return values;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.values);
    // this.props.handleSubmit();
  };

  // this needs to be passed down to each input
  handleFormChange = index => event => {
    console.log(index);
    const newValues = this.state.values.map((value, _index) => {
      if (index !== _index) {
        return value;
      } else {
        return { ...value, value: event.target.value };
      }
    });
    this.setState({
      values: newValues
    });
  };

  render() {
    let max = React.Children.count(this.props.children) - 1;
    let counter = 0;
    const childs = React.Children.map(this.props.children, child => {
      counter += 1;
      return React.cloneElement(child, {
        obj: {
          data: this.state.values[counter - 1],
          handleformchange: this.handleFormChange
        }
      });
    });
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {childs}
      </form>
    );
  }
}

export class FormElement extends Component {
  render() {
    const { label } = this.props;
    return (
      <div className="form__wrapper">
        <label className="form__label">{label}</label>
        <input
          className="form__input"
          value={this.props.obj.data.value}
          onChange={this.props.obj.handleformchange(this.props.obj.data.id)}
        />
      </div>
    );
  }
}
