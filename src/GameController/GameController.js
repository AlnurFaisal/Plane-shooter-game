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
    this.startCountdown = this.startCountdown.bind(this);
    this.stopCountdownTimer = this.stopCountdownTimer.bind(this);
    this.countdownTimer = null;
    this.minutes = null;
    this.seconds = null;
  }

  /* Use the maxTimeout, showCountdown to calculate and show the countdown timer in the game controller. Before
     the timer is supposed to show, the value of the timer will be --:--. After the timer has rundown its time,
     the value will be 00:00. Timer supposed to count down the time in every second. */

  startCountdown() {
    const interval = this.props.maxTimeout;
    console.log("Interval: ", interval);
    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + interval);
    console.log("endTime: ", endTime);
    endTime = endTime.getTime();

    this.countdownTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = endTime - now;
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        $("#countMinutes").text("--");
        $("#countSeconds").text("--");
        // will trigger the popup to appear one the time has expired
        clearInterval(this.countdownTimer);
        this.props.setLastTiming(0, 0);
        this.props.triggerPopup();
      } else {
        if (this.minutes === 0 && this.seconds < 5) {
          this.setState({
            disabled: true
          });
          $("#countMinutes").css("color", "red");
          $("#countSeconds").css("color", "red");
          $("#colon").css("color", "red");
          $("#countMinutes").text(`${this.minutes}`);
          $("#countSeconds").text(`${this.seconds}`);
        }
        $("#countMinutes").text(`${this.minutes}`);
        $("#countSeconds").text(`${this.seconds}`);
      }
    }, 1000);
  }

  render() {
    return (
      <div className="cockpit">
        <div className="row">
          <div className="offset-sm-4 col-sm-4">
            <h2 className="timer" align="center">
              {" "}
              <span id="countMinutes">
                {"--"}
              </span> <span id="colon">:</span>{" "}
              <span id="countSeconds">{"--"}</span>{" "}
            </h2>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <p
              className="lead"
              style={{ fontWeight: 900, color: "white", fontSize: 25 }}
              align="center"
            >
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
            <h3 className="scores">
              Score: <span className="show_score" id="myScore" />
              <br />
              Player: <span className="player">{this.props.playerName}</span>
              <br />
              Difficulty:{" "}
              <span className="difficulty">{this.props.difficulty}</span>
            </h3>
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

  stopCountdownTimer() {
    clearInterval(this.countdownTimer);
  }

  componentWillUpdate(nextProps) {
    if (this.props.showCountdown !== nextProps.showCountdown) {
      this.startCountdown();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getPoints !== nextProps.getPoints) {
      console.log("Updated Score: ", nextProps.getPoints);
      $("#myScore").text(`${nextProps.getPoints}`);
    }
    if (this.props.stopTimer !== nextProps.stopTimer) {
      console.log("Stopping countdown timer!");
      this.stopCountdownTimer();
      this.props.setLastTiming(this.minutes, this.seconds);
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
