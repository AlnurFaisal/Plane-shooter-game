import React, { Component } from "react";
import { findDuplicatesFromList } from "../Helper/Helper";
import * as $ from "jquery";
import "./Square.css";
import alien from "../img/space-ship.png";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 2000,
      initialPixelPosition: props.initialPixelPosition,
      currentPixelPosition: null,
      direction: props.direction,
      destroyed: false
    };
    this.alienStyle = {
      padding: "5px 5px",
      marginLeft: "47px",
      height: "40px",
      WebkitTransition: "all .4s",
      MozTransition: "all .4s",
      MsTransition: "all .4s",
      OTransition: "all .4s",
      transition: "all .4s"
    };
    this.alien = React.createRef();
    this.setMovement = this.setMovement.bind(this);
    this.manageMovement = this.manageMovement.bind(this);
    this.triggerMovement = this.triggerMovement.bind(this);
    this.calculatePixelPosition = this.calculatePixelPosition.bind(this);
    this.inverseDirection = this.inverseDirection.bind(this);
    this.checkExceedEdge = this.checkExceedEdge.bind(this);
    this.handleNegativeValue = this.handleNegativeValue.bind(this);
  }

  componentWillUpdate(nextProps) {
    // check if this square host the aliens that needs to be destroyed, if so will trigger the explode effects
    const copyDestroyedAliens = this.props.getDestroyedAliens();
    // check and ensure alien list that is passed in is not empty, if so will not trigger the effects
    if (
      this.props.destroyedAliens !== nextProps.destroyedAliens &&
      copyDestroyedAliens.length > 0
    ) {
      const indexNum = this.props.indexNum;
      const copyDestroyStatus = this.state.destroyed;
      if (
        findDuplicatesFromList(copyDestroyedAliens, indexNum) &&
        copyDestroyStatus === false
      ) {
        $("#" + this.alien.current.id).fadeOut(100);
        /* will need to set the destroyed state to true and this value will then
           trigger when updating position to the set "truePixelMove" to false */
        this.setState({
          destroyed: true
        });
      }
    } else if (
      this.props.stopMove !== nextProps.stopMove &&
      nextProps.stopMove === false
    ) {
      this.triggerMovement(
        this.state.initialPixelPosition,
        this.state.currentPixelPosition,
        false
      );
    }
  }

  componentDidMount() {
    let initialPixel = this.state.initialPixelPosition;
    const pixelMove = this.calculatePixelPosition(
      initialPixel,
      this.state.direction
    );
    const pixelMoveNew = this.checkExceedEdge(
      this.state.direction,
      pixelMove,
      this.alien.current.id
    );
    const direction = this.state.direction;
    const truePixelMove =
      pixelMoveNew !== undefined && pixelMoveNew !== null
        ? pixelMoveNew
        : pixelMove;
    initialPixel = this.state.initialPixelPosition;
    setTimeout(() => {
      $("#" + this.alien.current.id).addClass(
        this.setMovement(direction, truePixelMove, initialPixel)
      );
      this.props.updateAllAlienPosition(truePixelMove, this.props.indexNum);
      this.setState(
        {
          currentPixelPosition: truePixelMove
        },
        () => {
          // call the manageMovement method below here
          this.manageMovement();
        }
      );
    }, this.state.milliseconds);
  }

  render() {
    return (
      <div className="square1" id={"square_" + this.props.indexNum}>
        <img
          id={"alien_" + this.props.indexNum}
          src={alien}
          alt={this.state.direction}
          ref={this.alien}
          style={this.alienStyle}
        />
      </div>
    );
  }

  calculatePixelPosition(currentPixel, direction) {
    if (direction === "left") {
      return currentPixel - 158;
    } else if (direction === "right") {
      return currentPixel + 158;
    }
  }

  handleNegativeValue(value, direction) {
    value = value * -1;
    direction = this.inverseDirection(direction);
    return { value: value, direction: direction };
  }

  setMovement(direction, nextPixel, initialPixel) {
    let value = null;
    if (nextPixel === false) {
      return "no_move";
    } else if (direction === "right") {
      value = nextPixel - initialPixel;
    } else if (direction === "left") {
      value = initialPixel - nextPixel;
    }
    let obj =
      value < 0
        ? this.handleNegativeValue(value, direction)
        : { value: value, direction: direction };
    return obj.direction === "left"
      ? `move_left_${obj.value}`
      : `move_right_${obj.value}`;
  }

  manageMovement() {
    setTimeout(() => {
      this.triggerMovement(
        this.state.initialPixelPosition,
        this.state.currentPixelPosition,
        this.props.stopMove
      );
    }, this.state.milliseconds);
  }

  inverseDirection(direction) {
    return direction === "left" ? "right" : "left";
  }

  checkExceedEdge(direction, currentPixel, alienId) {
    const minValue = 0;
    const maxValue = 948;
    let exceed = false;
    let value = null;
    if (currentPixel < minValue) {
      exceed = true;
      value = 158;
      this.setState({
        direction: this.inverseDirection(direction)
      });
    } else if (currentPixel > maxValue) {
      exceed = true;
      value = 790;
      this.setState({
        direction: this.inverseDirection(direction)
      });
    }

    if (exceed === true) {
      return value;
    }
  }

  triggerMovement(initialPixel, currentPixel, stopMove) {
    // return the call to manageMovement if stopMove is still false
    // set the class and remove the unnecessary class after the 2 seconds iteration is complete
    if (stopMove === false) {
      const pixelMove = this.calculatePixelPosition(
        currentPixel,
        this.state.direction
      );
      const pixelMoveNew = this.checkExceedEdge(
        this.state.direction,
        pixelMove,
        this.alien.current.id
      );
      const direction = this.state.direction;
      let truePixelMove =
        pixelMoveNew !== undefined && pixelMoveNew !== null
          ? pixelMoveNew
          : pixelMove;
      if (this.state.destroyed === true) {
        truePixelMove = false;
      }
      initialPixel = this.state.initialPixelPosition;
      $("#" + this.alien.current.id).removeClass();
      $("#" + this.alien.current.id).addClass(
        this.setMovement(direction, truePixelMove, initialPixel)
      );
      this.props.updateAllAlienPosition(truePixelMove, this.props.indexNum);
      // will need to check if all aliens are already destroyed if so will not continue the command below
      if (this.props.completed === false) {
        this.setState({ currentPixelPosition: truePixelMove }, () => {
          return this.manageMovement();
        });
      }
    }
  }
}

export default Square;
