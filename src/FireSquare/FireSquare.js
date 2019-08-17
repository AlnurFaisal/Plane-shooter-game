import React, { Component } from "react";
import * as $ from "jquery";
import laser from "../img/fire.svg";
import "./FireSquare.css";

class FireSquare extends Component {
  constructor() {
    super();
    this.state = {};
    this.fireStyle = {
      padding: "5px 5px",
      marginLeft: "45px",
      height: "50px",
      transform: "rotate(180deg)",
      WebkitTransition: "all .4s",
      MozTransition: "all .4s",
      MsTransition: "all .4s",
      OTransition: "all .4s",
      transition: "all .4s"
    };
    this.laser = React.createRef();
  }

  render() {
    return (
      <div className="square_fire" id={"square_" + this.props.indexNum}>
        <img
          id={"fire_" + this.props.indexNum}
          src={laser}
          alt="fire"
          style={this.fireStyle}
          ref={this.laser}
        />
      </div>
    );
  }
}

export default FireSquare;
