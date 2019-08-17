import React, { Component } from "react";
import * as $ from "jquery";
import { getInitialPixelValue } from "../Helper/Helper";
import laser from "../img/fire.svg";
import "./FireSquare.css";

class FireSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fireStyle = {
      padding: "5px 5px",
      marginLeft: "45px",
      height: "50px",
      display: "none",
      transform: "rotate(180deg)",
      WebkitTransition: "all .4s",
      MozTransition: "all .4s",
      MsTransition: "all .4s",
      OTransition: "all .4s",
      transition: "all .4s"
    };
    this.laser = React.createRef();
    this.triggerFire = this.triggerFire.bind(this);
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
      $("#" + this.laser.current.id).css("display", "inline");
      this.props.resetFire();
    }
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
