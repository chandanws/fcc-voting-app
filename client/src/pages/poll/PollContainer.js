import PollComponent from "./PollComponent";
import { connect } from "react-redux";
import { fetchPolls } from "../../actions/pollsActions";
import {
  fetchSpecificPoll,
  initiatePollVote
} from "../../actions/specificPollActions";
import {
  fetchMakeComment,
  fetchCommentEdit
} from "../../actions/commentActions";

const mapStateToProps = state => ({
  specificPoll: state.specificPoll,
  userID: state.login.id
});

const mapDispatchToProps = dispatch => ({
  fetchSpecificPoll: poll_id => dispatch(fetchSpecificPoll(poll_id)),
  vote: (poll_id, option_id) => dispatch(initiatePollVote(poll_id, option_id)),
  editComment: (poll_id, comment_id, text) =>
    dispatch(fetchCommentEdit(poll_id, comment_id, text)),
  makeComment: (poll_id, parent_id, text) =>
    dispatch(fetchMakeComment(poll_id, parent_id, text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollComponent);
