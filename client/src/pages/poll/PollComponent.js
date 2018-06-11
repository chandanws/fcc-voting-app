import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";
import { Form } from "../../form/FormComponent";
import CommentContainer from "../../comment/CommentContainer";
import "./PollComponent.css";
import { LoadingCircle, LoadingWrapper } from "../../loading/LoadingCircle";

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
    const { specificPoll } = this.props;

    let piechart;

    if (specificPoll.isLoading) {
      piechart = (
        <LoadingWrapper>
          <LoadingCircle />
        </LoadingWrapper>
      );
    } else if (specificPoll.data.options === undefined) {
      piechart = <div>Empty</div>;
    } else {
      let options = [];
      let data = [];
      specificPoll.data.options.forEach(option => {
        options.push(
          <option key={option.option_id} value={option.option_id}>
            {option.name}
          </option>
        );
        data.push({ name: option.name, value: option.value });
      });
      piechart = (
        <div className="chart-form-wrapper">
          <ResponsiveContainer aspect={1}>
            <PieChart style={{ fontSize: "2rem" }} height={400}>
              <Legend verticalAlign="top" height={36} />
              <Pie label fill="#8884d8" dataKey="value" data={data}>
                {options.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Form
            className="chart__form"
            disabled={this.props.userID === null}
            onSubmit={this.handleSubmit}
          >
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
      );
    }

    return (
      <div style={{ width: "100%" }}>
        {/* TODO: Change text to be based on data from redux*/}
        <Typography component="h1" text="Best Actor" />
        <div>{piechart}</div>
        <Typography component="h2" text="Comments" />
        <form
          className="comment__form"
          onSubmit={e => {
            e.preventDefault();
            const replyValue = this.state.replyValue;
            this.setState({ replyValue: "" });
            this.props.makeComment(
              this.props.match.params.id,
              null,
              replyValue
            );
          }}
        >
          <textarea
            className="comment__textarea"
            value={this.state.replyValue}
            onChange={e => this.setState({ replyValue: e.target.value })}
          />
          <button
            disabled={this.props.userID === null}
            type="submit"
            className="comment__submit"
          >
            Submit
          </button>
        </form>

        <CommentContainer
          editComment={this.props.editComment}
          userID={this.props.userID}
          makeComment={this.props.makeComment}
          poll_id={this.props.match.params.id}
        />
      </div>
    );
  }
}
