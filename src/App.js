import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import GameController from "./GameController/GameController";
import { getInitialPixelValue } from "./Helper/Helper";
import { Card } from "react-bootstrap";
import * as $ from "jquery";
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
      initialPlanePosition: null,
      fire: false
    };
    this.title = React.createRef();
    this.updateAllAlienPosition = this.updateAllAlienPosition.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.getInitialPlanePosition = this.getInitialPlanePosition.bind(this);
    this.neverExceedEdge = this.neverExceedEdge.bind(this);
    this.getCurrentPlanePosition = this.getCurrentPlanePosition.bind(this);
    this.getCurrentPlaneDirection = this.getCurrentPlaneDirection.bind(this);
    this.getInitialPosition = this.getInitialPosition.bind(this);
    this.triggerExplode = this.triggerExplode.bind(this);
  }

  render() {
    console.log("maxSquare: ", this.state.maxSquare);
    console.log("All Alien Position: ", this.state.storeAllAlienPosition);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              id={"test"}
              align="center"
              className="title_name"
              onClick={this.triggerExplode}
              ref={this.title}
            >
              Space Wars
            </h1>
          </div>
        </div>
        <br />
        <Card>
          <Card.Body style={{ padding: "0px" }}>
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
              fire={this.state.fire}
              resetFire={this.resetFire.bind(this)}
              getAllAlienPosition={this.getAllAlienPosition.bind(this)}
            />
          </Card.Body>
          <Card.Footer>
            <GameController
              moveLeft={this.moveLeft}
              moveRight={this.moveRight}
              currentPlanePosition={this.state.currentPlanePosition}
              fireOff={this.fireOff.bind(this)}
              toggleStop={this.toggleStop.bind(this)}
            />
          </Card.Footer>
        </Card>
      </div>
    );
  }

  triggerExplode() {
    $("#" + this.title.current.id).fadeOut("slow");
  }

  fireOff() {
    this.setState({
      fire: true
    });
  }

  resetFire() {
    this.setState({
      fire: false
    });
  }

  getAllAlienPosition() {
    return this.state.storeAllAlienPosition;
  }

  updateAllAlienPosition(newPixelPosition, alienIndex) {
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

  toggleStop() {
    this.setState({
      stopMove: !this.state.stopMove
    });
  }
}

export default App;
