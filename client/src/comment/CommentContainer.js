import React, { Component } from "react";
import CommentComponent from "./CommentComponent";

export default class CommentContainer extends Component {
  state = {
    comments: [
      {
        username: "user1",
        body: "this is random body",
        children: []
      },
      {
        username: "user2",
        body: "this is random body",
        children: [
          {
            username: "user3",
            body: "this is random body",
            children: [
              {
                username: "user1",
                body: "this is random body",
                children: []
              },
              {
                username: "user1",
                body: "this is random body",
                children: []
              }
            ]
          },
          {
            username: "user1",
            body: "this is random body",
            children: []
          }
        ]
      },
      {
        username: "user1",
        body: "this is random body",
        children: [
          {
            username: "user1",
            body: "this is random body",
            children: []
          }
        ]
      },
      {
        username: "user1",
        body: "this is random body",
        children: []
      }
    ]
  };
  render() {
    return (
      <div>
        <Comments comments={this.state.comments} />
      </div>
    );
  }
}

export const Comments = props => {
  return (
    <div>
      {props.comments.map(comment => {
        return <CommentComponent comment={comment} />;
      })}
    </div>
  );
};
