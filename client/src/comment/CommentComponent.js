import React from "react";
import "./CommentComponent.css";

const CommentComponent = props => {
  return (
    <div className="comment">
      <div className="comment__row">
        <button className="comment__hidden">-</button>
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
    </div>
  );
};

export default CommentComponent;
