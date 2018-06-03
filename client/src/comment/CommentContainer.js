import React, { Component } from "react";
import CommentComponent from "./CommentComponent";
import { toggleElementInArray } from "../helpers/helpers";

export default class CommentContainer extends Component {
  state = {
    comments: [
      {
        id: 1,
        username: "user1",
        body: "this is random body",
        children: []
      },
      {
        id: 2,
        username: "user2",
        body: "this is random body",
        children: [
          {
            id: 5,
            username: "user3",
            body: "this is random body",
            children: [
              {
                id: 30,
                username: "user1",
                body: "this is random body",
                children: []
              },
              {
                id: 7,
                username: "user1",
                body: "this is random body",
                children: []
              }
            ]
          },
          {
            id: 4,
            username: "user1",
            body: "this is random body",
            children: []
          }
        ]
      },
      {
        id: 31,
        username: "user1",
        body: "this is random body",
        children: [
          {
            id: 32,
            username: "user1",
            body: "this is random body",
            children: []
          }
        ]
      },
      {
        id: 33,
        username: "user1",
        body: "this is random body",
        children: []
      }
    ],
    closed: []
  };

  toggleTree = id => {
    const newArray = toggleElementInArray(this.state.closed, id);
    this.setState({
      closed: newArray
    });
  };

  render() {
    console.log(this.state.closed);
    return (
      <div style={{ marginLeft: "-2rem" }}>
        <Comments
          closed={this.state.closed}
          toggleTree={this.toggleTree}
          comments={this.state.comments}
        />
      </div>
    );
  }
}

export const Comments = props => {
  return (
    <div className="comments-branch">
      {props.comments.map(comment => {
        return (
          <CommentComponent
            closed={props.closed}
            toggleTree={props.toggleTree}
            comment={comment}
          />
        );
      })}
    </div>
  );
};
