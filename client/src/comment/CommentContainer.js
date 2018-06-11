import React, { Component } from "react";
import CommentComponent from "./CommentComponent";
import {
  toggleElementInArray,
  toggleObjectsInArray,
  changeValueInArrayOfObjects,
  findObjectInArrayById
} from "../helpers/helpers";
import { connect } from "react-redux";
import { fetchComments } from "../actions/commentActions";

class CommentContainer extends Component {
  // comments will later be moved to redux state
  // closed comments and open reply boxes will move to new state
  // open replies => [ {id: 1, value: "something"}, {id: 2, value: "something" }]
  state = {
    closed: [],
    openReplies: [],
    editCommentId: null,
    editCommentValue: ""
  };

  componentDidMount() {
    this.props.fetchComments(this.props.poll_id);
  }

  toggleOpenReplies = id => {
    const newArray = toggleObjectsInArray(this.state.openReplies, id);
    this.setState({
      openReplies: newArray
    });
  };

  toggleTree = id => {
    const newArray = toggleElementInArray(this.state.closed, id);
    this.setState({
      closed: newArray
    });
  };

  handleReplyState = id => event => {
    const newArray = changeValueInArrayOfObjects(
      this.state.openReplies,
      id,
      event.target.value
    );
    this.setState({
      openReplies: newArray
    });
  };

  handleSubmit = id => event => {
    event.preventDefault();
    const obj = findObjectInArrayById(this.state.openReplies, id);
    this.props.makeComment(this.props.poll_id, obj.id, obj.value).then(() => {
      console.log("test");
      this.toggleOpenReplies(id);
    });
  };

  editComment = (id, text) => {
    this.setState({ editCommentId: id, editCommentValue: text });
  };

  handleEditCommentValue = event => {
    this.setState({ editCommentValue: event.target.value });
  };

  render() {
    const commentsTags = this.props.comments.data[0] ? (
      <Comments
        poll_id={this.props.poll_id}
        fetchEditComment={this.props.editComment}
        userID={this.props.userID}
        editCommentValue={this.state.editCommentValue}
        editComment={this.editComment}
        handleEditCommentValue={this.handleEditCommentValue}
        editCommentId={this.state.editCommentId}
        onSubmit={this.handleSubmit}
        openReplies={this.state.openReplies}
        toggleOpenReplies={this.toggleOpenReplies}
        handleReplyState={this.handleReplyState}
        closed={this.state.closed}
        toggleTree={this.toggleTree}
        comments={this.props.comments.data}
      />
    ) : (
      <div style={{ marginLeft: "2rem" }}>No comments</div>
    );
    return <div style={{ marginLeft: "-2rem" }}>{commentsTags}</div>;
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  fetchComments: poll_id => dispatch(fetchComments(poll_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContainer);

export const Comments = props => {
  return (
    <div className="comments-branch">
      {props.comments.map((comment, index) => {
        return (
          <CommentComponent
            poll_id={props.poll_id}
            fetchEditComment={props.fetchEditComment}
            userID={props.userID}
            editCommentValue={props.editCommentValue}
            editComment={props.editComment}
            handleEditCommentValue={props.handleEditCommentValue}
            editCommentId={props.editCommentId}
            onSubmit={props.onSubmit}
            key={index}
            openReplies={props.openReplies}
            toggleOpenReplies={props.toggleOpenReplies}
            handleReplyState={props.handleReplyState}
            closed={props.closed}
            toggleTree={props.toggleTree}
            comment={comment}
          />
        );
      })}
    </div>
  );
};
