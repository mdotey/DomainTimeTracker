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

/*
//open domains page
function openDomainsPage() {
	chrome.tabs.create({url: chrome.runtime.getURL("domainlist.html")});

}
*/
//chrome.runtime.sendMessage({request: "getAllDomains"}, function(response) {

    /*render(
      <DomainListComponent totalTime = {totalTime} domain = {url}/>,
      window.document.getElementById("app-container")
    );*/
//});

//Event listener for "See all domains" button
//const seeAllDomains = window.document.getElementById("seeAllButton");
//seeAllDomains.addEventListener("click", openDomainsPage, false);