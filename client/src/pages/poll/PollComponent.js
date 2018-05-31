import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "../../Typography/Typography";
import { Pie } from "react-chartjs-2";
import { Form, FormElement } from "../../form/FormComponent";
import CommentContainer from "../../comment/CommentContainer";

export default class PollComponent extends Component {
  state = {
    value: "something",
    dummyData: {
      labels: ["Green", "Blue", "Black"],
      datasets: [
        {
          data: [300, 200, 50],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    }
  };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.value);
  };
  render() {
    return (
      <div>
        {/* TODO: Change text to be based on data from redux*/}
        <Typography component="h1" text="Best Actor" />
        <Pie width={200} data={this.state.dummyData} />
        <Form onSubmit={this.handleSubmit}>
          <label className="form__label">
            Select option:
            <select
              style={{
                fontSize: "2rem",
                marginLeft: "1rem",
                border: "1px solid black"
              }}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value="something">Something</option>
              <option value="user">User</option>
              <option value="weird">Weird</option>
              <option value="anti">Anti</option>
            </select>
          </label>
        </Form>
        <Typography component="h2" text="Comments" />
        {/* Margin left fix for first element */}
        <div style={{ marginLeft: "-2rem" }}>
          <CommentContainer />
        </div>
      </div>
    );
  }
}
