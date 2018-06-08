import React, { Component } from "react";
import Appbar from "./appbar/AppbarComponent";
import DrawerComponent from "./drawer/DrawerComponent";
import "./NavigationComponent.css";

class Navigation extends Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div className="navigation">
        <Appbar toggleDrawer={this.toggleDrawer} />
        <DrawerComponent
          logout={this.props.logout}
          isLogged={this.props.isLogged}
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.drawerOpen}
        />
      </div>
    );
  }
}
export default Navigation;
