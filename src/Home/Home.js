import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Jumbotron fluid>
        <div className="container">
          <div className="row">
            <div className="offset-md-4 col-md-8">
              <h1 className="headline">Space Wars</h1>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="offset-md-1 col-md-11">
              <p className="lead">
                Single Player plane shooter game. Aim of the game is to destroy
                as many aliens as possible in the shortest amount of time.
                Players get to select difficulty level during game registration.
                Use the directional buttons to move your plane and click fire to
                shoot away. After the time is over or when you have destroyed
                all the aliens in the game, a popup will appear to inform you
                that you have completed the game with the score and time taken
                show clearly. Players can attempt to retry after the game has
                been completed.
              </p>
            </div>
            <div className="offset-md-4 col-md-8">
              <Button
                variant="success"
                size="lg"
                style={{ marginLeft: "64px" }}
              >
                Begin Game
              </Button>
              <Button variant="primary" size="lg" style={{ marginLeft: "5px" }}>
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

export default Home;
