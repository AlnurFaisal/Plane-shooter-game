import React, { Component } from "react";
import * as $ from "jquery";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import arrow from "../img/arrow.svg";
import "./GameController.css";

class GameController extends Component {
  constructor() {
    super();
    this.state = {
      milliseconds: 5000,
      disabled: false,
      percent: 100
    };
    this.doShoot = this.doShoot.bind(this);
  }

  render() {
    return (
      <div className="cockpit">
        <div className="row">
          <div className="col-md-12">
            <p className="lead" style={{ fontWeight: 900, color: "white", fontSize: 25 }} align="center">
              Laser Meter
            </p>
          </div>
          <div className="col-md-12">
            <ProgressBar
              animated
              now={this.state.percent}
              label={`${this.state.percent}%`}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-4">
            <h2 className="scores">
              Score: <span className="show_score" id="myScore" />
            </h2>
          </div>
          <div className="col-md-4" align="center">
            <Button
              id="fire"
              variant="primary"
              size="lg"
              onClick={this.doShoot}
              disabled={this.state.disabled}
            >
              <h2 className="fireButton">
                Fire <i className="fas fa-crosshairs fa-lg" />
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
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getPoints !== nextProps.getPoints) {
      console.log("Updated Score: ", nextProps.getPoints);
      $("#myScore").text(`${nextProps.getPoints}`);
    }
  }

  doShoot() {
    this.props.toggleStop();
    this.props.fireOff();
    this.setState({
      disabled: !this.state.disabled,
      percent: 0
    });
    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 4);
    endTime = endTime.getTime();
    const x = setInterval(() => {
      this.setState({ percent: (this.state.percent += 25) }, () => {
        let now = new Date().getTime();
        let distance = endTime - now;
        console.log("distance: ", distance);
        if (distance < 0) {
          this.setState({
            disabled: !this.state.disabled
          });
          clearInterval(x);
        }
      });
    }, 1000);
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
