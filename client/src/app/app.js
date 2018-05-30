import React from "react";
import Navigation from "../navigation";
import HomepageComponent from "../pages/homepage/homepageComponent";
import LoginComponent from "../pages/login/loginComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
