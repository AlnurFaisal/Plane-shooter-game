import React, { Component } from "react";
import Square from "../Square/Square";
import { generateArray } from "../Helper/Helper";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSquare: generateArray(this.props.maxSquare)
    };
  }

  render() {
    console.log("GameBoard_maxSquare: ", this.props.maxSquare);
    console.log("gameSquare: ", this.state.gameSquare);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="css-grid-container">
            {this.state.gameSquare.map((element, i) => {
              return <Square key={i} indexNum={element} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
