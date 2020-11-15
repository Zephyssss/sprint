import React from "react";
import ReactDOM from "react-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./index.css";
import App from "./App";

const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,
};

ReactDOM.render(
  <Provider template={AlertTemplate} {...options}>
    <App />
  </Provider>,
  document.getElementById("root")
);
