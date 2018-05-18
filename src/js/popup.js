import "../css/popup.css";
import Timer from "./popup/timer_component.js";
import React from "react";
import { render } from "react-dom";
const console = chrome.extension.getBackgroundPage().console;

chrome.runtime.sendMessage({request: "getStartTime"}, function(response) {
    const startingTime = response.startTime;
    render(
      <Timer startingTimer = {startingTime}/>,
      window.document.getElementById("app-container")
    );
});
