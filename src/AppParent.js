import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Register from "./Registration/Register";

class AppParent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={App} />
          <Route path="/register" component={Register} />
        </BrowserRouter>
      </div>
    );
  }

  // create methods below to pass to popup component to allow records of players to be updated to Firebase DB
}

export default AppParent;
