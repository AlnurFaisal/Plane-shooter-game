import React, { Component } from "react";
import GameBoard from "./GameBoard/GameBoard";
import GameController from "./GameController/GameController";
import { Redirect } from "react-router";
import {
  getInitialPixelValue,
  checkAllFalse,
  setMaxTime,
  getDifficultyMultiplier
} from "./Helper/Helper";
import { Database } from "./Db/configFirebase";
import Popup from "./Popup/Popup";
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
      fire: false,
      points: 0,
      completed: false,
      begin: true,
      maxTimeout: null,
      showCountdown: false,
      stopTimer: false,
      home: false,
      playerName: null,
      difficulty: null,
      finalTime: null
    };
    this.updateAllAlienPosition = this.updateAllAlienPosition.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.getInitialPlanePosition = this.getInitialPlanePosition.bind(this);
    this.neverExceedEdge = this.neverExceedEdge.bind(this);
    this.getCurrentPlanePosition = this.getCurrentPlanePosition.bind(this);
    this.getCurrentPlaneDirection = this.getCurrentPlaneDirection.bind(this);
    this.getInitialPosition = this.getInitialPosition.bind(this);
    this.triggerExplode = this.triggerExplode.bind(this);
    this.toggleStop = this.toggleStop.bind(this);
    this.showCountdownTimer = this.showCountdownTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.begin !== prevState.begin &&
      this.state.showCountdown === false
    ) {
      this.showCountdownTimer();
    }
  }

  componentWillMount() {
    const getDb = Database.ref("temp");
    getDb.on("value", snapshot => {
      const dbLength = snapshot.val().length - 1;
      const db = snapshot.val();
      console.log("Last Record: ", db[dbLength]);
      this.setState({
        maxTimeout: setMaxTime(db[dbLength].difficulty),
        playerName: db[dbLength].name,
        difficulty: db[dbLength].difficulty
      });
    });
  }

  componentDidMount() {
    if (this.state.begin === true) {
      let counter = 3;
      let endTime = new Date();
      endTime.setSeconds(endTime.getSeconds() + 3);
      endTime = endTime.getTime();

      const countTimer = setInterval(() => {
        let now = new Date().getTime();
        let difference = endTime - now;
        if (counter !== 0) {
          $("#countDown").text(counter);
        }
        counter--;
        if (difference < 0) {
          this.setState({
            begin: false
          });
          clearInterval(countTimer);
        }
      }, 1000);
    }
  }

  render() {
    if (this.state.home) {
      return <Redirect to="/" />;
    } else {
      console.log("maxSquare: ", this.state.maxSquare);
      console.log("All Alien Position: ", this.state.storeAllAlienPosition);
      console.log("completed: ", this.state.completed);
      const popupSubject = this.state.completed ? "complete" : "begin";
      const toggleShow = this.state.completed || this.state.begin;
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1
                id={"test"}
                align="center"
                className="title_name"
                onClick={this.triggerExplode}
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
                updatePoints={this.updatePoints.bind(this)}
                completed={this.state.completed}
              />
            </Card.Body>
            <Card.Footer
              style={{
                backgroundColor: "black",
                outline: "1px black solid",
                border: "1px solid"
              }}
            >
              <GameController
                moveLeft={this.moveLeft}
                moveRight={this.moveRight}
                currentPlanePosition={this.state.currentPlanePosition}
                fireOff={this.fireOff.bind(this)}
                toggleStop={this.toggleStop}
                getPoints={this.state.points}
                playerName={this.state.playerName}
                difficulty={this.state.difficulty}
                maxTimeout={this.state.maxTimeout}
                showCountdown={this.state.showCountdown}
                stopTimer={this.state.stopTimer}
                triggerPopup={this.triggerPopup.bind(this)}
                setLastTiming={this.setLastTiming.bind(this)}
              />
            </Card.Footer>
          </Card>
          <Popup
            popup={popupSubject}
            show={toggleShow}
            handleClick={this.handleClick.bind(this)}
            handleRetry={this.handleRetry.bind(this)}
            playerName={this.state.playerName}
            difficulty={this.state.difficulty}
            calculateScore={this.calculateScore}
            finalTime={this.state.finalTime}
          />
        </div>
      );
    }
  }

  // create a method below to collect and store the time in the state so we can save in firebaseDb
  setLastTiming(minutes, seconds) {
    /* need to convert minutes to seconds then calculate total seconds taken by
       subtracting total seconds game allow to the seconds taken */
    const maxTimeout = this.state.maxTimeout / 60;
    const leftoverTime = minutes + seconds / 60;
    let finalTime = maxTimeout - leftoverTime;
    finalTime = `${Math.round(finalTime * 10) / 10}`;
    const setTiming = finalTime.split(".");
    this.setState({
      finalTime: `${setTiming[0]} Minutes ${(setTiming[1] / 10) * 60} Seconds`
    });
  }

  calculateScore() {
    const currentPoints = this.state.points;
    const difficultyMultiplier = getDifficultyMultiplier(this.state.difficulty);
    return currentPoints * difficultyMultiplier;
  }

  handleRetry() {
    window.location.reload();
  }

  handleClick() {
    const difficulty = this.state.difficulty;
    const name = this.state.playerName;
    const score = this.calculateScore();
    const timeTaken = this.state.finalTime;
    // call the method here to save the player details & scores after user exits game
    const playersLength = this.props.playersLength;
    Database.ref(`players/${playersLength}`).set({
      difficulty: difficulty,
      name: name,
      score: score,
      time_taken: timeTaken
    });
    this.setState({
      home: true
    });
  }

  triggerExplode() {
    $("#test").fadeOut("slow");
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

  updatePoints(addPoints) {
    let copyCurrentPoints = this.state.points;
    copyCurrentPoints = copyCurrentPoints + addPoints;
    this.setState({
      points: copyCurrentPoints
    });
  }

  getAllAlienPosition() {
    return this.state.storeAllAlienPosition;
  }

  /* create a method below to countdown using maxTimeout before trigerring the popup without
     caring whether user finish destroying the aliens and set the state to completed. */

  /* Create a method to be called in componentWillMount to check if the popup for
     the begin has been hidden which will trigger some state change. Will then trigger the countdown
     clock to rundown the time. Pass this state used to toggle to show countdown timer in the GameController */

  showCountdownTimer() {
    this.setState({
      showCountdown: true
    });
  }

  triggerPopup() {
    console.log("Trigerring Popup!");
    this.setState({
      completed: true,
      stopMove: true
    });
  }

  updateAllAlienPosition(newPixelPosition, alienIndex) {
    let copyAllAlienPosition = Object.assign(
      {},
      this.state.storeAllAlienPosition
    );
    copyAllAlienPosition[alienIndex] = newPixelPosition;
    /* before setting state check if all the alien position set is set to false
       if so, will update the state with the status completed set to true which
       will trigger a popup to appear */
    // will stop timer if all aliens are destroyed so we can calculate the scores accurately
    const completed = checkAllFalse(copyAllAlienPosition);
    this.setState(
      {
        completed: completed,
        storeAllAlienPosition: copyAllAlienPosition,
        stopTimer: completed
      },
      () => {
        return;
      }
    );
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
