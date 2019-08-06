import React, { Component } from "react";
import * as $ from "jquery";
import Button from "react-bootstrap/Button";
import arrow from "../img/arrow.svg";
import "./GameController.css";

class GameController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 10000
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h2 className="scores">
            Score: <span />
          </h2>
        </div>
        <div className="col-md-4" align="center">
          <Button variant="primary" size="lg">
            <h2 className="fireButton">
              Shoot <i className="fas fa-crosshairs fa-lg" />
            </h2>
          </Button>
        </div>
        <div className="col-md-4" align="center">
          <img
            src={arrow}
            alt="left"
            id="left"
            onClick={this.movement.bind(this, false)}
            className="arrowLeft"
          />
          <img
            src={arrow}
            alt="right"
            id="right"
            onClick={this.movement.bind(this, false)}
            className="arrowRight"
          />
        </div>
      </div>
    );
  }

  movement(retry, event) {
    console.log(
      "Game_Controller Current Plane Position: ",
      this.props.currentPlanePosition
    );
    event.preventDefault();
    let directionId = event.target.id;
    console.log("directionId: ", directionId);
    if (retry === false) {
      directionId === "left"
        ? this.props.moveLeft(this.props.currentPlanePosition)
        : this.props.moveRight(this.props.currentPlanePosition);
    }
    /*setTimeout(() => {
      $("#" + directionId).on("mousedown", () => {
        directionId === "left"
          ? this.props.moveLeft(this.props.currentPlanePosition)
          : this.props.moveRight(this.props.currentPlanePosition);
        this.movement.bind(this, true);
      });
    }, this.state.milliseconds);*/
  }
}

export default GameController;
