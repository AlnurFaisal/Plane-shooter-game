import React, { Component } from "react";
import "./Square.css";

class Square extends Component {
  render() {
    return (
      <div className="square1" id={this.props.indexNum}>
        <span>{this.props.indexNum}</span>
      </div>
    );
  }
}

export default Square;
