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
      gameSquare: generateArray(props.maxSquare),
      aliens: randomizedArray(props.noOfAliens, props.maxAliens),
      getDirections: randomizedDirection(props.playableRows),
      aliensDirection: {},
      removeDuplicateAliens: [],
      currentItr: 0
    };
    this.checkIndex = this.checkIndex.bind(this);
  }

  componentWillMount() {
    if (this.state.currentItr === 0) {
      let copyAliens = [...this.state.aliens];
      let sortedAliens = sortArray(copyAliens);
      let copyCurrentItr = this.state.currentItr;
      console.log("sortedAliens: ", sortedAliens);
      let removeDuplicateAliens = fixDuplicate(sortedAliens);
      let storeDirections = assignDirection(
        removeDuplicateAliens,
        this.state.getDirections
      );
      this.setState({
        aliensDirection: Object.assign({}, storeDirections),
        removeDuplicateAliens: [...removeDuplicateAliens],
        currentItr: (copyCurrentItr += 1)
      });
    }
  }

  render() {
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
                    updateAllAlienPosition={this.props.updateAllAlienPosition}
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
