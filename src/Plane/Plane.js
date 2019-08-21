import React, { Component } from "react";
import * as $ from "jquery";
import "./Plane.css";
import plane from "../img/002-ufo.svg";

class Plane extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      initialPosition: null,
      currentPosition: null,
      currentDirection: null
    };
    this.planeStyle = {
      padding: "5px 5px",
      marginLeft: "47px",
      height: "40px",
      WebkitTransition: "all .4s",
      MozTransition: "all .4s",
      MsTransition: "all .4s",
      OTransition: "all .4s",
      transition: "all .4s"
    };
    this.plane = React.createRef();
    this.setMovement = this.setMovement.bind(this);
    this.inverseDirection = this.inverseDirection.bind(this);
    this.handleNegativeValue = this.handleNegativeValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Previous plane position: ", this.state.currentPosition);
    if (
      this.props.currentPlanePosition !== nextProps.currentPlanePosition ||
      this.props.currentPlaneDirection !== nextProps.currentPlaneDirection ||
      this.props.initialPlanePosition !== nextProps.initialPlanePosition
    ) {
      this.setState(
        {
          initialPosition: this.props.getInitialPosition(),
          currentPosition: this.props.getCurrentPlanePosition(),
          currentDirection: this.props.getCurrentPlaneDirection()
        },
        () => {
          console.log("Initial Plane Position: ", this.state.initialPosition);
          console.log("Current Plane Position: ", this.state.currentPosition);
          console.log("Current Plane Direction: ", this.state.currentDirection);
          console.log("Initializing plane movement: ", true);
          $("#" + this.plane.current.id).removeClass();
          $("#" + this.plane.current.id).addClass(
            this.setMovement(
              this.state.currentDirection,
              this.state.currentPosition,
              this.state.initialPosition
            )
          );
        }
      );
    }
  }

  componentWillMount() {
    if (this.state.counter === 0) {
      this.props.getInitialPlanePosition(this.props.indexNum);
      this.setState({
        counter: (this.state.counter += 1)
      });
    }
  }

  render() {
    return (
      <div className="square_plane" id={"square_" + this.props.indexNum}>
        <img
          id={"plane_" + this.props.indexNum}
          src={plane}
          alt="plane"
          style={this.planeStyle}
          ref={this.plane}
        />
      </div>
    );
  }

  inverseDirection(direction) {
    return direction === "left" ? "right" : "left";
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
      console.log(
        `Move Left from ${initialPixel} to ${nextPixel} (${initialPixel} - ${nextPixel}) : `,
        value
      );
    } else {
      value = nextPixel - initialPixel;
      console.log(
        `Move Right from ${initialPixel} to ${nextPixel} (${nextPixel} - ${initialPixel}) : `,
        value
      );
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
}

export default Plane;
