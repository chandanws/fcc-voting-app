import { connect } from "react-redux";
import LoginComponent from "./loginComponent";
import { fetchLogin } from "../../actions/authActions";

const mapStateToProps = state => ({
  loginState: state.login
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(fetchLogin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
