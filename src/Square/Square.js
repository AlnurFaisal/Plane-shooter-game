import React, { Component } from "react";
import "./Square.css";
import alien from "../img/001-alien.svg";

class Square extends Component {
  render() {
    return (
      <div className="square1" id={this.props.indexNum}>
        <img id={this.props.indexNum} src={alien} alt="Alien" className="alien_icon" />
      </div>
    );
  }
}

export default Square;
