import React, { Component } from "react";
import * as $ from "jquery";
import Button from "react-bootstrap/Button";
import arrow from "../img/arrow.svg";
import "./GameController.css";

class GameController extends Component {
  constructor() {
    super();
    this.state = {
      milliseconds: 5000
    };
    this.doShoot = this.doShoot.bind(this);
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
          <Button variant="primary" size="lg" onClick={this.doShoot}>
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

  doShoot() {
    this.props.toggleStop();
    this.props.fireOff();
    setTimeout(() => {
      // un-freeze the aliens after the aliens has been destroyed
      this.props.toggleStop();
    }, 2000);
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
    /* setTimeout(() => {
      $("#" + directionId).on("mousedown", () => {
        directionId === "left"
          ? this.props.moveLeft(this.props.currentPlanePosition)
          : this.props.moveRight(this.props.currentPlanePosition);
        this.movement.bind(this, true);
      });
    }, this.state.milliseconds); */
  }
}

export default GameController;
