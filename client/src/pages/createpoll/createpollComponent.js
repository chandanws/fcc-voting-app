import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { FormElement, Form } from "../../form/FormComponent";
import { removeElementFromArray } from "../../helpers/helpers";

class CreatePollComponent extends Component {
  state = {
    title: "",
    options: [""]
  };

  handleSubmit = event => {
    event.preventDefault();
    // do something with redux later
    console.log(this.state);
  };

  addOption = () => this.setState({ options: [...this.state.options, ""] });

  removeOption = index =>
    this.setState({
      options: removeElementFromArray(this.state.options, index)
    });

  handleOptionsChange = index => event => {
    const updatedOptions = this.state.options.map((value, _index) => {
      if (_index === index) {
        return event.target.value;
      } else {
        return value;
      }
    });
    this.setState({
      options: updatedOptions
    });
  };

  handleTitleChange = id => event =>
    this.setState({ title: event.target.value });

  render() {
    const options = this.state.options.map((value, index) => {
      return (
        <div className="form-wrapper--remove">
          <FormElement
            id={index}
            onChange={this.handleOptionsChange}
            value={value}
            label="option"
          />
          <button
            style={{
              alignSelf: "center",
              backgroundColor: "lightgrey"
            }}
            onClick={() => this.removeOption(index)}
          >
            x
          </button>
        </div>
      );
    });
    return (
      <div>
        <Typography component="h1" text="Create New Poll" />
        <Form id={1} onSubmit={this.handleSubmit}>
          <FormElement
            id={1}
            onChange={this.handleTitleChange}
            value={this.state.username}
            label="title"
          />
          {options}
          <button onClick={this.addOption} type="button">
            Add option
          </button>
        </Form>
      </div>
    );
  }
}

export default CreatePollComponent;
