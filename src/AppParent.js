import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Register from "./Registration/Register";
import Leaderboard from "./Leaderboard/Leaderboard";
import { Database } from "./Db/configFirebase";

class AppParent extends Component {
  constructor() {
    super();
    this.state = {
      playersLength: null
    };
  }

  componentWillMount() {
    const getDb = Database.ref("players");
    getDb.on("value", snapshot => {
      const dbLength = snapshot.val() ? snapshot.val().length : 0;
      this.setState({
        playersLength: dbLength
      });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route
            path="/game"
            render={() => <App playersLength={this.state.playersLength} />}
          />
          <Route path="/register" render={() => <Register />} />
        </BrowserRouter>
      </div>
    );
  }

  /* Create methods below to pass to popup component to allow records of players to be updated to
     Firebase DB. Use the players array.length to set new index to the list in db. */
}

export default AppParent;
