import React, { Component } from "react";
import { Typography } from "../../Typography/Typography";
import List, { ListItem } from "../../list/ListComponent";
import { Button } from "../../button/ButtonComponent";
import { Link } from "react-router-dom";

class HomepageComponent extends Component {
  componentDidMount() {
    this.props.fetchPolls();
  }
  render() {
    console.log(this.props.polls);
    const { polls } = this.props;
    const pollsList = polls.data.map(poll => {
      return (
        <ListItem key={poll.id}>
          <Button
            component={Link}
            to={`/polls/${poll.id}`}
            modifiers={["align-left"]}
          >
            {poll.title}
          </Button>
        </ListItem>
      );
    });
    return (
      <div>
        <Typography component="h1" text="All polls" />
        <List modifiers={["bordered"]}>{pollsList}</List>
      </div>
    );
  }
}

export default HomepageComponent;
