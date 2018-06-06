import React, { Component } from "react";
import CommentComponent from "./CommentComponent";
import {
  toggleElementInArray,
  toggleObjectsInArray,
  changeValueInArrayOfObjects
} from "../helpers/helpers";
import { connect } from "react-redux";
import { fetchComments } from "../actions/commentActions";

class CommentContainer extends Component {
  // comments will later be moved to redux state
  // closed comments and open reply boxes will move to new state
  // open replies => [ {id: 1, value: "something"}, {id: 2, value: "something" }]
  state = {
    closed: [],
    openReplies: []
  };

  componentDidMount() {
    this.props.fetchComments(this.props.poll_id);
  }

  toggleOpenReplies = id => {
    const newArray = toggleObjectsInArray(this.state.openReplies, id);
    this.setState({
      openReplies: newArray
    });
    console.log("Test", newArray);
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

  render() {
    console.log("Comments", this.props.comments);
    return (
      <div style={{ marginLeft: "-2rem" }}>
        {this.props.comments.data[0] && (
          <Comments
            openReplies={this.state.openReplies}
            toggleOpenReplies={this.toggleOpenReplies}
            handleReplyState={this.handleReplyState}
            closed={this.state.closed}
            toggleTree={this.toggleTree}
            comments={this.props.comments.data}
          />
        )}
      </div>
    );
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
