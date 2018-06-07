import { connect } from "react-redux";
import App from "./AppComponent";

const mapStateToProps = state => ({
  loginState: state.login
});

export default connect(mapStateToProps)(App);
