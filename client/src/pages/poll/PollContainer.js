import PollComponent from "./PollComponent";
import { connect } from "react-redux";
import { fetchPolls } from "../../actions/pollsActions";
import { fetchSpecificPoll } from "../../actions/specificPollActions";

const mapStateToProps = state => ({
  specificPoll: state.specificPoll
});

const mapDispatchToProps = dispatch => ({
  fetchSpecificPoll: poll_id => dispatch(fetchSpecificPoll(poll_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollComponent);
