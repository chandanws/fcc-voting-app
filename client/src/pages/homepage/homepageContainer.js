import HomepageComponent from "./homepageComponent";
import { connect } from "react-redux";
import { fetchPolls } from "../../actions/pollsActions";

const mapStateToProps = state => ({
  polls: state.polls
});

const mapDispatchToProps = dispatch => ({
  fetchPolls: () => dispatch(fetchPolls())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageComponent);
