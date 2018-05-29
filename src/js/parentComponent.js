import React from "react";
import { hot } from "react-hot-loader";
import Timer from "./timerComponent.js";

var console = chrome.extension.getBackgroundPage().console;

class ParentComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	handleDomainClick() {
		console.log("here3");
		chrome.tabs.query({url: chrome.runtime.getURL("domainList.html")}, function(tabs) {
		    if (tabs.length) {
		    	console.log("here");
		        chrome.tabs.update(tabs[0].id, {active: true});
		        chrome.tabs.reload();
		    } 
		    else {
		    	console.log("here2");
		        chrome.tabs.create({url: chrome.runtime.getURL("domainList.html")});
		    }
		});

	}

	handleSettingsClick(){
		chrome.tabs.query({url: chrome.runtime.getURL("options.html")}, function(tabs) {
		    if (tabs.length) {
		        chrome.tabs.update(tabs[0].id, {active: true});
		    } 
		    else {
		        chrome.tabs.create({url: chrome.runtime.getURL("options.html")});
		    }
		});
	}

	render() {
		console.log("status " + this.props.status);
		if (this.props.status === "unblocked") {
			return (
				<div id="outerWrapper">
					<div id="TimerComponent">
						<Timer 
							totalTime = {this.props.totalTime} 
							domain = {this.props.domain}
							isShortTime = {this.props.isShortTime}
						/>
					</div>
					<div id="buttons">
	          			<button id="domainButton" onClick={this.handleDomainClick}>Show Domain List</button>
	          			<button id="settingsButton" onClick={this.handleSettingsClick}>Settings</button>
	          		</div>
	       		</div>
			)
		}
		else {
			return (
				<div>
					<div className="blocked-popup"> {this.props.domain} is blocked!</div>
					<div id="buttons">
	          			<button id="domainButton" onClick={this.handleDomainClick}>Show Domain List</button>
	          			<button id="settingsButton" onClick={this.handleSettingsClick}>Settings</button>
	          		</div>
				</div>
			)
		}
	}
};



export default hot(module)(ParentComponent)