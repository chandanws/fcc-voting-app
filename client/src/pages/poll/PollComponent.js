import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "../../Typography/Typography";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  Label,
  ResponsiveContainer
} from "recharts";
import { Form, FormElement } from "../../form/FormComponent";
import CommentContainer from "../../comment/CommentContainer";
import "./PollComponent.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class PollComponent extends Component {
  state = {
    value: "something",
    dummyData: [
      { name: "B", value: 400 },
      { name: "A", value: 200 },
      { name: "C", value: 600 }
    ],
    replyValue: ""
  };

  handleChange = e => this.setState({ value: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.value);
  };
  render() {
    return (
      <div style={{ width: "100%" }}>
        {/* TODO: Change text to be based on data from redux*/}
        <Typography component="h1" text="Best Actor" />
        <div className="chart-form-wrapper">
          <ResponsiveContainer aspect={1}>
            <PieChart style={{ fontSize: "2rem" }} height={400}>
              <Legend verticalAlign="top" height={36} />
              <Pie
                label
                fill="#8884d8"
                dataKey="value"
                data={this.state.dummyData}
              >
                {this.state.dummyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Form className="chart__form" onSubmit={this.handleSubmit}>
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
        </div>
        <Typography component="h2" text="Comments" />
        <form
          className="comment__form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <textarea
            className="comment__textarea"
            onChange={e => this.setState({ replyValue: e.target.value })}
          />
          <button className="comment__submit">Submit</button>
        </form>

        <CommentContainer />
      </div>
    );
  }
}
