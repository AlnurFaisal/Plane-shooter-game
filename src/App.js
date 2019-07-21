import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      maxSquare: 56,
      noOfAliens: 15,
      maxAliens: 35,
      playableRows: 5
    };
  }

  render() {
    console.log("maxSquare: ", this.state.maxSquare);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 align="center" className="title_name">
              Space Wars
            </h1>
          </div>
        </div>
        <br />
        <GameBoard
          maxSquare={this.state.maxSquare}
          noOfAliens={this.state.noOfAliens}
          maxAliens={this.state.maxAliens}
          playableRows={this.state.playableRows}
        />
      </div>
    );
  }
}

export default App;
