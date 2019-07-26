import React, { Component } from "react";
import Square from "../Square/Square";
import EmptySquare from "../EmptySquare/EmptySquare";
import {
  generateArray,
  randomizedArray,
  sortArray,
  fixDuplicate,
  randomizedDirection,
  assignDirection,
  getInitialPixelValue
} from "../Helper/Helper";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSquare: generateArray(this.props.maxSquare),
      aliens: randomizedArray(this.props.noOfAliens, this.props.maxAliens),
      getDirections: randomizedDirection(this.props.playableRows),
      aliensDirection: {},
      removeDuplicateAliens: []
    };
    this.checkIndex = this.checkIndex.bind(this);
  }

  componentWillMount() {
    let copyAliens = [...this.state.aliens];
    let sortedAliens = sortArray(copyAliens);
    console.log("sortedAliens: ", sortedAliens);
    let removeDuplicateAliens = fixDuplicate(sortedAliens);
    let storeDirections = assignDirection(
      removeDuplicateAliens,
      this.state.getDirections
    );
    this.setState({
      aliensDirection: Object.assign({}, storeDirections),
      removeDuplicateAliens: [...removeDuplicateAliens]
    });
  }

  render() {
    console.log("GameBoard_maxSquare: ", this.props.maxSquare);
    console.log("gameSquare: ", this.state.gameSquare);
    console.log("Index number of Aliens: ", this.state.aliens);
    console.log("Remove Aliens Duplicates: ", this.state.removeDuplicateAliens);
    console.log("Aliens directions: ", this.state.aliensDirection);
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="css-grid-container">
            {this.state.gameSquare.map((element, i) => {
              if (this.checkIndex(element)) {
                return (
                  <Square
                    key={i}
                    indexNum={element}
                    direction={this.state.aliensDirection[element]}
                    stopMove={this.props.stopMove}
                    initialPixelPosition={getInitialPixelValue(element)}
                  />
                );
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
    return bool === true;
  }
}

export default GameBoard;
