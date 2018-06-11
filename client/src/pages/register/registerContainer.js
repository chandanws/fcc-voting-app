import { connect } from "react-redux";
import { fetchPolls } from "../../actions/pollsActions";
import RegisterComponent from "./registerComponent";
import {
  fetchUsernameAvailability,
  fetchLogin
} from "../../actions/authActions";

const mapStateToProps = state => ({
  checkingUsernameAvailability: state.login.checkingUsernameAvailability,
  usernameAvailability: state.login.usernameAvailability
});

const mapDispatchToProps = dispatch => ({
  checkUsernameAvailability: username =>
    dispatch(fetchUsernameAvailability(username)),
  login: (username, password, url) =>
    dispatch(fetchLogin(username, password, url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
