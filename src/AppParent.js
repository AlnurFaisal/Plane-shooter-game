import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Register from "./Registration/Register";
import { Database } from "./Db/configFirebase";

class AppParent extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  componentWillMount() {
    let copySnapshot = [];
    const getDb = Database.ref("players");
    getDb.on("value", snapshot => {
      console.log("snapshot: ", snapshot);
      snapshot.forEach(childSnapshot => {
        console.log("childSnapshot_key: ", childSnapshot.val());
        copySnapshot.push(childSnapshot.val());
      });
      this.setState({
        players: [...copySnapshot]
      });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route
            path="/game"
            render={() => <App players={this.state.players} />}
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
