import PollComponent from "./PollComponent";
import { connect } from "react-redux";
import { fetchPolls } from "../../actions/pollsActions";
import {
  fetchSpecificPoll,
  initiatePollVote
} from "../../actions/specificPollActions";

const mapStateToProps = state => ({
  specificPoll: state.specificPoll
});

const mapDispatchToProps = dispatch => ({
  fetchSpecificPoll: poll_id => dispatch(fetchSpecificPoll(poll_id)),
  vote: (poll_id, option_id) => dispatch(initiatePollVote(poll_id, option_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollComponent);