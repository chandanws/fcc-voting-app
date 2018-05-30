import React from "react";
import Navigation from "../navigation";
import HomepageComponent from "../pages/homepage/homepageComponent";
import LoginComponent from "../pages/login/loginComponent";
import RegisterComponent from "../pages/register/registerComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PollComponent from "../pages/poll/PollComponent";

const App = props => {
  return (
    <div>
      <Router>
        <div>
          <Navigation />
          <main
            style={{
              position: "relative",
              width: "90vw",
              margin: "auto"
            }}
          >
            <Route exact path="/" component={HomepageComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <Route path="/polls/:id" component={PollComponent} />
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
