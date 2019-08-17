import React from "react";
import { checkFireRow } from "../Helper/Helper";
import FireSquare from "../FireSquare/FireSquare";
import "./EmptySquare.css";

const EmptySquare = props => {
  if (checkFireRow(props.indexNum)) {
    return <FireSquare fire={props.fire} indexNum={props.indexNum} />;
  } else {
    return <div className="square" id={"square_" + props.indexNum} />;
  }
};

export default EmptySquare;
