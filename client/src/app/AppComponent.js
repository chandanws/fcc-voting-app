import React from "react";
import Navigation from "../navigation";
import HomepageComponent from "../pages/homepage/homepageComponent";
import LoginComponent from "../pages/login/loginComponent";
import RegisterComponent from "../pages/register/registerComponent";
import CreatePollComponent from "../pages/createpoll/createpollComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PollComponent from "../pages/poll/PollComponent";
import "./AppComponent.css";

const App = props => {
  return (
    <div>
      <Router>
        <div>
          <Navigation />
          <main className="main">
            <Route exact path="/" component={HomepageComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <Switch>
              <Route path="/polls/new" component={CreatePollComponent} />
              <Route path="/polls/:id" component={PollComponent} />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
