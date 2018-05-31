import React from "react";
import { Comments } from "./CommentContainer";
import "./CommentComponent.css";

const CommentComponent = props => {
  // props.closed
  // props.comment.id
  const { closed, comment } = props;
  const result =
    closed.indexOf(comment.id) !== -1 ? (
      <div className="comment">
        <div className="comment__row">
          <button
            onClick={() => props.toggleTree(props.comment.id)}
            className="comment__hidden"
          >
            -
          </button>
          <div className="comment__meta">
            <b className="comment__user">User1</b>
            ,poster 30 hours ago
          </div>
        </div>
      </div>
    ) : (
      <div className="comment">
        <div className="comment__row">
          <button
            onClick={() => props.toggleTree(props.comment.id)}
            className="comment__hidden"
          >
            -
          </button>
          <div className="comment__meta">
            <b className="comment__user">User1</b>
            ,poster 30 hours ago
          </div>
        </div>
        <div className="comment__row">
          <p className="comment__paragraph">
            This poll is very good, this is my message!
          </p>
        </div>
        <div className="comment__row">
          <button className="comment__action">Reply</button>
          <button className="comment__action">Edit</button>
          <button className="comment__action">Delete</button>
        </div>
        <Comments
          closed={closed}
          toggleTree={props.toggleTree}
          comments={props.comment.children}
        />
      </div>
    );

  return <div>{result}</div>;
};

export default CommentComponent;
