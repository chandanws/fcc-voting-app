import React from "react";
import Navigation from "../navigation";
import HomepageContainer from "../pages/homepage/homepageContainer";
import LoginContainer from "../pages/login/LoginContainer";
import RegisterComponent from "../pages/register/registerComponent";
import CreatePollComponent from "../pages/createpoll/createpollComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PollContainer from "../pages/poll/PollContainer";
import "./AppComponent.css";
import ProfileComponent from "../pages/profile/ProfileComponent";
import { WithAuth } from "../middleware/authentication";

const App = props => {
  return (
    <div>
      <Router>
        <div>
          <Navigation />
          <main className="main">
            <Route exact path="/" component={HomepageContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterComponent} />
            <WithAuth
              path="/profile"
              component={ProfileComponent}
              isLogged={false}
            />
            <Switch>
              <WithAuth path="/polls/new" component={CreatePollComponent} />
              <Route path="/polls/:id" component={PollContainer} />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
