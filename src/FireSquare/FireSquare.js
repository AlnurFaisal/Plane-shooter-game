import React, { Component } from "react";
import * as $ from "jquery";
import {
  getInitialPixelValue,
  findDuplicates,
  checkWhichRow,
  filterArrayBasedOnRows,
  getMoveValue
} from "../Helper/Helper";
import laser from "../img/fire_2.svg";
import "./FireSquare.css";

class FireSquare extends Component {
  constructor() {
    super();
    this.state = {
      milliseconds: 150,
      milliseconds2: 600
    };
    this.fireStyle = {
      padding: "5px 5px",
      marginLeft: "45px",
      height: "50px",
      WebkitTransition: "all .4s",
      MozTransition: "all .4s",
      MsTransition: "all .4s",
      OTransition: "all .4s",
      transition: "all .4s"
    };
    this.laser = React.createRef();
    this.triggerFire = this.triggerFire.bind(this);
    this.doPrepLaser = this.doPrepLaser.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.fire) {
      this.triggerFire();
    }
  }

  triggerFire() {
    /* Check first what is the current plane position and compare using this
       indexNum whether this FireSquare is the one we need to show the laser */
    const getColumn = getInitialPixelValue(this.props.indexNum);
    if (getColumn === this.props.planePosition) {
      const obj = this.doPrepLaser();
      /* Call a method inside a setTimeout method that will run after 4s
      the reseting the fire value. During this moment the aliens will freeze at its
      current location and not move any direction. This action will wait for
      the movement of the laser to the appropriate enemy. */

      this.handleMovement(obj.largestIndexRow);
      setTimeout(() => {
        /* use the alienList to pass to another method that allow us to interact the alien element to
        trigger the explode effect */
        this.props.destroyAliens(obj.destroyAlienList);
        this.props.resetFire();
        $("#" + this.laser.current.id).attr("src", "");
        $("#" + this.laser.current.id).removeClass();
        $("#" + this.laser.current.id).addClass("reset");
      }, this.state.milliseconds2);
    }
  }

  doPrepLaser() {
    // firstly will need to check which alien enemy will the laser hit first
    // read all the position of the alien enemy and determine which ones currently are in the same column as the plane
    // handle "alienList" scenerio where they are empty
    const copyAllAlienPosition = this.props.getAllAlienPosition();
    const copyPlanePosition = this.props.planePosition;
    let alienList = [];
    for (let key in copyAllAlienPosition) {
      // eslint-disable-next-line no-prototype-builtins
      if (copyAllAlienPosition.hasOwnProperty(key)) {
        if (findDuplicates(copyAllAlienPosition[key], copyPlanePosition)) {
          alienList.push(key);
        }
      }
    }
    // reverse sort the alien list and take the largest index value
    alienList = alienList.length > 0 ? alienList.reverse() : [];
    /* filter the list further to see there are any more aliens that belong to the same row as the
       largest index and remove those that are not of the same row
    */
    const largestIndexRow =
      alienList.length > 0 ? checkWhichRow(parseInt(alienList[0])) : null;
    const destroyAlienList =
      alienList.length > 0
        ? filterArrayBasedOnRows(largestIndexRow, alienList)
        : [];
    return { largestIndexRow, destroyAlienList };
  }

  handleMovement(row) {
    /* Trigger the laser to move and stop at the correct square vertically using the row
       value then explode and hide the aliens using its indexNum value. */
    // when row is empty will move the laser all the way to the top row of the "GameBoard"
    if (row === null) {
      $("#" + this.laser.current.id).removeClass();
      $("#" + this.laser.current.id).attr("src", laser);
      setTimeout(() => {
        $("#" + this.laser.current.id).addClass("move_all_up");
      }, this.state.milliseconds);
    } else {
      const move = getMoveValue(row);
      $("#" + this.laser.current.id).removeClass();
      $("#" + this.laser.current.id).attr("src", laser);
      setTimeout(() => {
        $("#" + this.laser.current.id).addClass(`move_up_${move}`);
      }, this.state.milliseconds);
    }
  }

  render() {
    return (
      <div className="square_fire" id={"square_" + this.props.indexNum}>
        <img
          id={"fire_" + this.props.indexNum}
          src=""
          style={this.fireStyle}
          ref={this.laser}
        />
      </div>
    );
  }
}

export default FireSquare;
