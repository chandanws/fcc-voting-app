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
    id: 0,
    replyValue: ""
  };

  componentDidMount() {
    this.props.fetchSpecificPoll(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (
      !this.props.specificPoll.isLoading &&
      this.props.specificPoll.data.options &&
      this.state.id === 0
    ) {
      this.setState({ id: this.props.specificPoll.data.options[0].option_id });
    }
  }

  handleChange = e => {
    this.setState({ id: +e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .vote(this.props.match.params.id, this.state.id)
      .then(() => this.props.fetchSpecificPoll(this.props.match.params.id));
  };

  render() {
    let piechart;
    let options;
    const { specificPoll } = this.props;
    console.log(specificPoll);
    if (
      specificPoll.isLoading ||
      specificPoll.data.options === undefined ||
      specificPoll.voting
    ) {
      piechart = <div>Nothing</div>;
    } else {
      options = specificPoll.data.options.map(option => {
        return (
          <option
            data-id={option.option_id}
            key={option.option_id}
            value={option.option_id}
          >
            {option.name}
          </option>
        );
      });
      const data = specificPoll.data.options.map(option => {
        return { name: option.name, value: option.value };
      });
      piechart = (
        <PieChart style={{ fontSize: "2rem" }} height={400}>
          <Legend verticalAlign="top" height={36} />
          <Pie label fill="#8884d8" dataKey="value" data={data}>
            {options.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      );
    }

    return (
      <div style={{ width: "100%" }}>
        {/* TODO: Change text to be based on data from redux*/}
        <Typography component="h1" text="Best Actor" />
        <div className="chart-form-wrapper">
          <ResponsiveContainer aspect={1}>{piechart}</ResponsiveContainer>
          <Form className="chart__form" onSubmit={this.handleSubmit}>
            <label className="form__label">
              Select option:
              {specificPoll.data.options && (
                <select
                  style={{
                    fontSize: "2rem",
                    marginLeft: "1rem",
                    border: "1px solid black"
                  }}
                  value={this.state.id}
                  onChange={this.handleChange}
                >
                  {options}
                </select>
              )}
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

        <CommentContainer poll_id={this.props.match.params.id} />
      </div>
    );
  }
}
