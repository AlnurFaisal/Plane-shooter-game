import React, { Component } from "react";
import Square from "../Square/Square";
import EmptySquare from "../EmptySquare/EmptySquare";
import { generateArray, randomizedArray } from "../Helper/Helper";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSquare: generateArray(this.props.maxSquare),
      aliens: randomizedArray(this.props.noOfAliens, this.props.maxAliens)
    };
    this.checkIndex = this.checkIndex.bind(this);
  }

  render() {
    console.log("GameBoard_maxSquare: ", this.props.maxSquare);
    console.log("gameSquare: ", this.state.gameSquare);
    console.log("Index number of Aliens: ", this.state.aliens);
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="css-grid-container">
            {this.state.gameSquare.map((element, i) => {
              if (this.checkIndex(element)) {
                return <Square key={i} indexNum={element} />;
              } else {
                return <EmptySquare key={i} indexNum={element} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  checkIndex(index) {
    const alienIndex = [...this.state.aliens];
    let bool = false;
    alienIndex.forEach(element => {
      if (element === index) {
        bool = true;
      }
    });
    if (bool === true) {
      return true;
    } else {
      return false;
    }
  }
}

export default GameBoard;
