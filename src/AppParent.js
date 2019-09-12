import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Register from "./Registration/Register";
import { checkDifficulty } from "./Helper/Helper";
import { Database } from "./Db/configFirebase";

class AppParent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      options: {},
      players: []
    };
  }

  componentWillMount() {
    let copySnapshot = null;
    const getDb = Database.ref("players");
    getDb.on("value", snapshot => {
      console.log("snapshot: ", snapshot);
      snapshot.forEach(childSnapshot => {
        console.log("childSnapshot_key: ", childSnapshot.val());
        copySnapshot = childSnapshot.val();
      });
      this.setState({
        players: [...copySnapshot]
      });
    });
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleClick(event) {
    const option = event.target.id;
    const objOptions = checkDifficulty(option);
    this.setState({
      options: Object.assign({}, objOptions)
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route
            path="/game"
            render={() => (
              <App
                players={this.state.players}
                playerName={this.state.name}
                difficulty={this.state.options}
              />
            )}
          />
          <Route
            path="/register"
            render={() => (
              <Register
                handleClick={this.handleClick.bind(this)}
                handleChange={this.handleChange.bind(this)}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }

  /* Create methods below to pass to popup component to allow records of players to be updated to
     Firebase DB. Use the players array.length to set new index to the list in db. */
}

export default AppParent;
