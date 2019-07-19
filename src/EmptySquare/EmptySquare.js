import React from "react";
import "./EmptySquare.css";

const EmptySquare = props => {
  return <div className="square" id={"square_" + props.indexNum} />;
};

export default EmptySquare;
