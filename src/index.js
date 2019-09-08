import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppParent from "./AppParent";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

ReactDOM.render(<AppParent />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
