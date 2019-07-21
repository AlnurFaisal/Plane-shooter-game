import React, { Component } from "react";
import "./Square.css";
import alien from "../img/001-alien.svg";

class Square extends Component {
  render() {
    return (
      <div className="square1" id={"square_" + this.props.indexNum}>
        <img
          id={"alien_" + this.props.indexNum}
          src={alien}
          alt={this.props.direction}
          className="alien_icon"
        />
      </div>
    );
  }
}

export default Square;
