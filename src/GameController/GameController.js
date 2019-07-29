import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import arrow from "../img/arrow.svg";
import "./GameController.css";

class GameController extends Component {
  constructor() {
    super();
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
              Shoot <i class="fas fa-crosshairs fa-lg" />
            </h2>
          </Button>
        </div>
        <div className="col-md-4" align="center">
          <img src={arrow} alt="left" id="left" className="arrowLeft" />
          <img src={arrow} alt="right" id="right" className="arrowRight" />
        </div>
      </div>
    );
  }
}

export default GameController;
