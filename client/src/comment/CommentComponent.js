import React from "react";
import { Comments } from "./CommentContainer";
import "./CommentComponent.css";
import { objectWithIdInArray } from "../helpers/helpers";

const CommentComponent = props => {
  // props.closed
  // props.comment.id
  const {
    closed,
    comment,
    toggleOpenReplies,
    openReplies,
    handleReplyState,
    onSubmit,
    handleEditCommentValue,
    editCommentId,
    editComment,
    editCommentValue,
    userID,
    fetchEditComment,
    poll_id
  } = props;

  const textOrEdit =
    editCommentId === props.comment.comment_id ? (
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchEditComment(poll_id, comment.comment_id, editCommentValue).then(
            () => {
              editComment(null, "");
            }
          );
        }}
        className="comment__form"
      >
        <textarea
          onChange={handleEditCommentValue}
          className="comment__textarea"
          value={editCommentValue}
        />
        <input className="form__submit" type="submit" value="save" />
      </form>
    ) : (
      <div className="comment__row">
        <p className="comment__paragraph">{comment.body}</p>
      </div>
    );
  const result =
    closed.indexOf(comment.comment_id) !== -1 ? (
      <div className="comment">
        <div className="comment__row">
          <button
            onClick={() => props.toggleTree(props.comment.comment_id)}
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
            onClick={() => props.toggleTree(props.comment.comment_id)}
            className="comment__hidden"
          >
            -
          </button>
          <div className="comment__meta">
            <b className="comment__user">User1</b>
            ,poster 30 hours ago
          </div>
        </div>
        {textOrEdit}
        <div className="comment__row">
          <button
            disabled={userID === null}
            onClick={() => toggleOpenReplies(comment.comment_id)}
            className="comment__action"
          >
            Reply
          </button>
          <button
            disabled={userID !== comment.user_id}
            onClick={() => {
              console.log(comment.body);
              editComment(comment.comment_id, comment.body);
            }}
            className="comment__action"
          >
            Edit
          </button>
        </div>
        {objectWithIdInArray(openReplies, comment.comment_id) !== -1 && (
          <form
            className="comment__form"
            onSubmit={onSubmit(comment.comment_id)}
          >
            <textarea
              className="comment__textarea"
              onChange={handleReplyState(comment.comment_id)}
            />
            <button className="comment__submit" disabled={userID === null}>
              Submit
            </button>
          </form>
        )}
        <Comments
          poll_id={poll_id}
          fetchEditComment={fetchEditComment}
          editComment={editComment}
          userID={userID}
          editCommentValue={editCommentValue}
          editCommentId={editCommentId}
          handleEditCommentValue={handleEditCommentValue}
          onSubmit={onSubmit}
          openReplies={props.openReplies}
          toggleOpenReplies={props.toggleOpenReplies}
          handleReplyState={props.handleReplyState}
          closed={closed}
          toggleTree={props.toggleTree}
          comments={props.comment.children}
        />
      </div>
    );

  return <React.Fragment>{result}</React.Fragment>;
};

export default CommentComponent;
