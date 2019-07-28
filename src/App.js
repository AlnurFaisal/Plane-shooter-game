import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import { secondColumn, sixthColumn } from "./Helper/Helper";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      maxSquare: 56,
      noOfAliens: 15,
      maxAliens: 35,
      playableRows: 5,
      stopMove: false,
      storeAllAlienPosition: {}
    };
    this.triggerStop = this.triggerStop.bind(this);
    this.updateAllAlienPosition = this.updateAllAlienPosition.bind(this);
  }

  render() {
    console.log("maxSquare: ", this.state.maxSquare);
    console.log("All Alien Position: ", this.state.storeAllAlienPosition);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              align="center"
              className="title_name"
              onClick={this.triggerStop}
            >
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
          stopMove={this.state.stopMove}
          updateAllAlienPosition={this.updateAllAlienPosition}
        />
      </div>
    );
  }

  updateAllAlienPosition(newPixelPosition, alienIndex, direction) {
    let copyAllAlienPosition = Object.assign(
      {},
      this.state.storeAllAlienPosition
    );
    if (newPixelPosition === -158 || newPixelPosition === 1106) {
      newPixelPosition = newPixelPosition === 1106 ? 948 : 0;
    }
    if (secondColumn.includes(alienIndex) && direction === "left") {
      newPixelPosition = 158;
    } else if (sixthColumn.includes(alienIndex) && direction === "right") {
      newPixelPosition = 790;
    }
    copyAllAlienPosition[alienIndex] = newPixelPosition;
    this.setState({
      storeAllAlienPosition: copyAllAlienPosition
    });
  }

  triggerStop() {
    this.setState({
      stopMove: true
    });
  }
}

export default App;
