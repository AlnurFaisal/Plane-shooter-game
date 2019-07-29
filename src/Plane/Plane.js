import React, { Component } from "react";
import "./Plane.css";
import plane from "../img/002-ufo.svg";

class Plane extends Component {
  constructor() {
    super();
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
  }

  render() {
    return (
      <div className="square" id={"square_" + this.props.indexNum}>
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
}

export default Plane;
