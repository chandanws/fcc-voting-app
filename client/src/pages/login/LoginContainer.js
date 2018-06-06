import { connect } from "react-redux";
import LoginComponent from "./loginComponent";
import { fetchLogin } from "../../actions/authActions";

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(fetchLogin(username, password))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginComponent);
