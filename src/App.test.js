import React from "react";
import ReactDOM from "react-dom";
import AppParent from "./AppParent";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
