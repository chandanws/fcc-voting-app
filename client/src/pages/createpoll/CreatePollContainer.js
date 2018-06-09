import CreatePollComponent from "./createpollComponent";
import { connect } from "react-redux";
import { fetchPollCreate } from "../../actions/createPollActions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createPoll: (title, options) => dispatch(fetchPollCreate(title, options))
});

export default connect(
  null,
  mapDispatchToProps
)(CreatePollComponent);
