import "../css/popup.css";
import Timer from "./popup/timer_component.js";
import React from "react";
import { render } from "react-dom";
const console = chrome.extension.getBackgroundPage().console;

//Get starting time for current domain and render it
chrome.runtime.sendMessage({request: "getTotalTime"}, function(response) {
    const totalTime = response.totalTime;
    const url = response.domain;
    console.log(totalTime + " date.now" + Date.now());
    render(
      <Timer totalTime = {totalTime} domain = {url}/>,
      window.document.getElementById("app-container")
    );
});
