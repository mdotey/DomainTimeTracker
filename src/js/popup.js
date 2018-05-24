import "../css/popup.css";
import Parent from "./parentComponent.js"
//import Timer from "./timer_component.js";
//import DomainList from "./domainlist_component.js";
import React from "react";
import { render } from "react-dom";
const console = chrome.extension.getBackgroundPage().console;

//Get starting time for current domain and render the extension popup
chrome.runtime.sendMessage({request: "getTotalTime"}, function(response) {
    const totalTime = response.totalTime;
    const url = response.domain;
    render(
      <Parent 
      	totalTime = {totalTime} 
      	domain = {url}/>,
      window.document.getElementById("popup-container")
    );
});