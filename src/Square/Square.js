import React, { Component } from "react";
import * as $ from "jquery";
import "./Square.css";
import alien from "../img/001-alien.svg";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 1000,
      initialPixelPosition: props.initialPixelPosition,
      currentPixelPosition: null
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
  }

  componentDidMount() {
    let initialPixel = this.state.initialPixelPosition;
    const direction = this.props.direction;
    const pixelMove = this.calculatePixelPosition(initialPixel, direction);
    console.log("alien ids: ", this.alien.current.id);
    setTimeout(() => {
      $("#" + this.alien.current.id).addClass(
        this.setMovement(direction, pixelMove, initialPixel)
      );
      console.log(
        `current pixel position for ${this.props.indexNum}: `,
        pixelMove
      );
      this.setState({
        currentPixelPosition: pixelMove
      });
      // call the manageMovement method below here
      this.manageMovement();
    }, this.state.milliseconds);
  }

  render() {
    return (
      <div className="square1" id={"square_" + this.props.indexNum}>
        <img
          id={"alien_" + this.props.indexNum}
          src={alien}
          alt={this.props.direction}
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

  setMovement(direction, nextPixel, initialPixel) {
    let value = null;
    if (direction === "left") {
      value = initialPixel - nextPixel;
    } else {
      value = nextPixel - initialPixel;
    }
    return direction === "left" ? `move_left_${value}` : `move_right_${value}`;
  }

  manageMovement() {
    setTimeout(() => {
      this.triggerMovement(
        this.state.initialPixelPosition,
        this.state.currentPixelPosition,
        this.props.direction,
        this.props.stopMove
      );
    }, this.state.milliseconds);
  }

  triggerMovement(initialPixel, currentPixel, direction, stopMove) {
    // return the call to manageMovement if stopMove is still false
    // set the class and remove the unnecessary class after the 2 seconds iteration is complete
    const pixelMove = this.calculatePixelPosition(currentPixel, direction);
    console.log(
      `initial pixel position for ${this.props.indexNum}: `,
      initialPixel
    );
    console.log(
      `current pixel position for ${this.props.indexNum}: `,
      currentPixel
    );
    console.log(`next pixel position for ${this.props.indexNum}: `, pixelMove);
    $("#" + this.alien.current.id).removeClass();
    $("#" + this.alien.current.id).addClass(
      this.setMovement(direction, pixelMove, initialPixel)
    );
    this.setState({ currentPixelPosition: pixelMove }, () => {
      if (stopMove === false) {
        return this.manageMovement();
      }
    });
  }
}

export default Square;
