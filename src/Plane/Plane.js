import React, { Component } from "react";
import * as $ from "jquery";
import "./Plane.css";
import plane from "../img/002-ufo.svg";

class Plane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      initialPosition: null,
      currentPosition: null,
      currentDirection: null,
      previousPosition: null,
      rewriteInitial: false
    };
    this.planeStyle = {
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
    this.plane = React.createRef();
    this.setMovement = this.setMovement.bind(this);
  }

  componentWillUpdate(prevProps) {
    console.log("Previous plane position: ", this.state.currentPosition);
    let copyPreviousPosition = this.state.previousPosition
      ? this.state.previousPosition
      : null;
    if (
      this.state.currentPosition === 0 ||
      this.state.currentPosition === 948
    ) {
      copyPreviousPosition = this.state.currentPosition;
    }
    let rewriteInitial =
      copyPreviousPosition === 0 || copyPreviousPosition === 948;
    if (this.state.currentPosition === 474) {
      rewriteInitial = false;
    }
    if (
      this.props.currentPlanePosition !== prevProps.currentPlanePosition ||
      this.props.currentPlaneDirection !== prevProps.currentPlaneDirection ||
      this.props.initialPlanePosition !== prevProps.initialPlanePosition
    ) {
      this.setState(
        {
          initialPosition: this.props.getInitialPosition(),
          currentPosition: this.props.getCurrentPlanePosition(),
          currentDirection: this.props.getCurrentPlaneDirection(),
          previousPosition: copyPreviousPosition,
          rewriteInitial: rewriteInitial
        },
        () => {
          console.log("Initial Plane Position: ", this.state.initialPosition);
          console.log("Current Plane Position: ", this.state.currentPosition);
          console.log("Current Plane Direction: ", this.state.currentDirection);
          console.log("Initializing plane movement: ", true);
          const previousPosition =
            this.state.rewriteInitial === true
              ? this.state.previousPosition
              : this.state.initialPosition;
          $("#" + this.plane.current.id).removeClass();
          $("#" + this.plane.current.id).addClass(
            this.setMovement(
              this.state.currentDirection,
              this.state.currentPosition,
              previousPosition
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
    return direction === "left" ? `move_left_${value}` : `move_right_${value}`;
  }
}

export default Plane;
