import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import GameController from "./GameController/GameController";
import {
  secondColumn,
  sixthColumn,
  getInitialPixelValue
} from "./Helper/Helper";
import { Card } from "react-bootstrap";
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
      storeAllAlienPosition: {},
      currentPlanePosition: null,
      currrentPlaneDirection: null,
      initialPlanePosition: null
    };
    this.triggerStop = this.triggerStop.bind(this);
    this.updateAllAlienPosition = this.updateAllAlienPosition.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.getInitialPlanePosition = this.getInitialPlanePosition.bind(this);
    this.neverExceedEdge = this.neverExceedEdge.bind(this);
    this.getCurrentPlanePosition = this.getCurrentPlanePosition.bind(this);
    this.getCurrentPlaneDirection = this.getCurrentPlaneDirection.bind(this);
    this.getInitialPosition = this.getInitialPosition.bind(this);
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
        <Card>
          <Card.Body>
            <GameBoard
              maxSquare={this.state.maxSquare}
              noOfAliens={this.state.noOfAliens}
              maxAliens={this.state.maxAliens}
              playableRows={this.state.playableRows}
              stopMove={this.state.stopMove}
              updateAllAlienPosition={this.updateAllAlienPosition}
              getInitialPlanePosition={this.getInitialPlanePosition}
              initialPlanePosition={this.state.initialPlanePosition}
              currentPlanePosition={this.state.currentPlanePosition}
              currrentPlaneDirection={this.state.currrentPlaneDirection}
              getCurrentPlanePosition={this.getCurrentPlanePosition}
              getCurrentPlaneDirection={this.getCurrentPlaneDirection}
              getInitialPosition={this.getInitialPosition}
            />
          </Card.Body>
          <Card.Footer>
            <GameController
              moveLeft={this.moveLeft}
              moveRight={this.moveRight}
              currentPlanePosition={this.state.currentPlanePosition}
            />
          </Card.Footer>
        </Card>
      </div>
    );
  }

  updateAllAlienPosition(newPixelPosition, alienIndex, direction) {
    let copyAllAlienPosition = Object.assign(
      {},
      this.state.storeAllAlienPosition
    );
    copyAllAlienPosition[alienIndex] = newPixelPosition;
    this.setState({
      storeAllAlienPosition: copyAllAlienPosition
    });
  }

  getCurrentPlanePosition() {
    return this.state.currentPlanePosition;
  }

  getCurrentPlaneDirection() {
    return this.state.currrentPlaneDirection;
  }

  getInitialPosition() {
    return this.state.initialPlanePosition;
  }

  getInitialPlanePosition(element) {
    /* use the helper method to fetch the pixel value of the current plane position
       and update the initial position of the plane in the state */
    const pixelValue = getInitialPixelValue(element);
    this.setState({
      initialPlanePosition: pixelValue,
      currentPlanePosition: pixelValue
    });
  }

  neverExceedEdge(currPosition, direction) {
    let bool = false;
    if (direction === "left") {
      bool = currPosition - 158 !== -158;
    } else if (direction === "right") {
      bool = currPosition + 158 !== 1106;
    }
    return bool;
  }

  moveLeft(currPosition) {
    // set the code below to check and determine whether to move left anot
    // if move left will over hit the edge, stay in the most left square
    // will update the state value the plane position and direction after the move and this value will be passed down to plane component
    console.log("currPosition: ", currPosition);
    console.log("move left App.js: ", true);
    if (this.neverExceedEdge(currPosition, "left")) {
      this.setState(
        {
          currentPlanePosition: currPosition - 158,
          currrentPlaneDirection: "left"
        },
        () => {
          return;
        }
      );
    }
  }

  moveRight(currPosition) {
    // set the code below to check and determine whether to move right anot
    // if move right will over hit the edge, stay in the most right square
    // will update the state value the plane position and direction after the move and this value will be passed down to plane component
    console.log("currPosition: ", currPosition);
    console.log("move right App.js: ", true);
    if (this.neverExceedEdge(currPosition, "right")) {
      this.setState(
        {
          currentPlanePosition: currPosition + 158,
          currrentPlaneDirection: "right"
        },
        () => {
          return;
        }
      );
    }
  }

  triggerStop() {
    this.setState({
      stopMove: true
    });
  }
}

export default App;
