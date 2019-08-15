import React, { Component } from "react";
import * as $ from "jquery";
import "./Square.css";
import alien from "../img/001-alien.svg";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 2000,
      initialPixelPosition: props.initialPixelPosition,
      currentPixelPosition: null,
      direction: props.direction
    };
    this.alienStyle = {
      padding: "5px 5px",
      marginLeft: "47px",
      width: "40px",
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
    console.log("alien ids: ", this.alien.current.id);
    setTimeout(() => {
      $("#" + this.alien.current.id).addClass(
        this.setMovement(direction, truePixelMove, initialPixel)
      );
      this.props.updateAllAlienPosition(
        truePixelMove,
        this.props.indexNum,
        direction
      );
      console.log(
        `initial pixel position for ${this.props.indexNum}: `,
        initialPixel
      );
      console.log(
        `current pixel position for ${this.props.indexNum}: `,
        truePixelMove
      );
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
    const obj = { value: value, direction: direction };
    return obj;
  }

  setMovement(direction, nextPixel, initialPixel) {
    let value = null;
    if (direction === "left") {
      value = initialPixel - nextPixel;
    } else {
      value = nextPixel - initialPixel;
    }
    let obj =
      value < 0
        ? this.handleNegativeValue(value, direction)
        : { value: value, direction: direction };
    console.log("obj.value: ", obj.value);
    console.log("obj.direction: ", obj.direction);
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
    console.log("initial entry direction value: ", direction);
    console.log("initial entry currentPixel value: ", currentPixel);
    console.log(
      "check currentPixel exceed maxValue: ",
      currentPixel > maxValue
    );
    console.log(
      "check currentPixel exceed minValue: ",
      currentPixel < minValue
    );

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
      console.log(`returned currentPixel ${alienId}: `, value);
      return value;
    }
  }

  triggerMovement(initialPixel, currentPixel, stopMove) {
    // return the call to manageMovement if stopMove is still false
    // set the class and remove the unnecessary class after the 2 seconds iteration is complete
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
    const truePixelMove =
      pixelMoveNew !== undefined && pixelMoveNew !== null
        ? pixelMoveNew
        : pixelMove;
    initialPixel = this.state.initialPixelPosition;
    console.log(
      `initial pixel position for ${this.props.indexNum}: `,
      initialPixel
    );
    console.log(
      `current pixel position for ${this.props.indexNum}: `,
      currentPixel
    );
    console.log(
      `next pixel position for ${this.props.indexNum}: `,
      truePixelMove
    );
    $("#" + this.alien.current.id).removeClass();
    $("#" + this.alien.current.id).addClass(
      this.setMovement(direction, truePixelMove, initialPixel)
    );
    this.props.updateAllAlienPosition(
      truePixelMove,
      this.props.indexNum,
      direction
    );
    this.setState({ currentPixelPosition: truePixelMove }, () => {
      if (stopMove === false) {
        return this.manageMovement();
      }
    });
  }
}

export default Square;
