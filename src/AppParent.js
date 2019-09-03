import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";

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
        </BrowserRouter>
      </div>
    );
  }
}

export default AppParent;
