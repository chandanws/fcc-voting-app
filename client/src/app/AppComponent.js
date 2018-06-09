import React, { Component } from "react";
import Navigation from "../navigation";
import HomepageContainer from "../pages/homepage/homepageContainer";
import RegisterComponent from "../pages/register/registerComponent";
import { Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PollContainer from "../pages/poll/PollContainer";
import "./AppComponent.css";
import ProfileComponent from "../pages/profile/ProfileComponent";
import { WithAuth, WithoutLogIn } from "../middleware/authentication";
import LoginContainer from "../pages/login/LoginContainer";
import history from "../history";
import CreatePollContainer from "../pages/createpoll/CreatePollContainer";

export default class App extends Component {
  componentDidMount() {
    this.props.tokenLogin();
  }

  render() {
    const { loginState } = this.props;
    console.log(loginState);
    return (
      <div>
        <Router history={history}>
          <div>
            <Navigation
              logout={this.props.logout}
              isLogged={loginState.username !== ""}
            />
            <main className="main">
              <Route exact path="/" component={HomepageContainer} />
              <WithoutLogIn
                path="/register"
                component={RegisterComponent}
                isLogged={loginState.username !== ""}
              />
              <WithAuth
                isChecking={loginState.isChecking}
                path="/profile"
                component={ProfileComponent}
                isLogged={loginState.username !== ""}
              />
              <WithoutLogIn
                path="/login"
                component={LoginContainer}
                isLogged={loginState.username !== ""}
              />
              <Switch>
                <WithAuth
                  isChecking={loginState.isChecking}
                  path="/polls/new"
                  component={CreatePollContainer}
                  isLogged={loginState.username !== ""}
                />
                <Route path="/polls/:id" component={PollContainer} />
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}
