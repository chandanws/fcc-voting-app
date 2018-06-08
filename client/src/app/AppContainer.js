import { connect } from "react-redux";
import App from "./AppComponent";
import { logout, checkTokenLogin } from "../actions/authActions";

const mapStateToProps = state => ({
  loginState: state.login
});

const mapDispatchToProps = dispatch => ({
  tokenLogin: () => dispatch(checkTokenLogin()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
