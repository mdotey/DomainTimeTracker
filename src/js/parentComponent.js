import React from "react";
import { hot } from "react-hot-loader";
import Timer from "./timerComponent.js";

var console = chrome.extension.getBackgroundPage().console;

class ParentComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	handleDomainClick() {		
		chrome.tabs.query({url: chrome.runtime.getURL("domainList.html")}, function(tabs) {
		    if (tabs.length) {
		        chrome.tabs.update(tabs[0].id, {active: true});
		        chrome.tabs.reload();
		    } 
		    else {
		        chrome.tabs.create({url: chrome.runtime.getURL("domainList.html")});
		    }
		});
	}

	handleSettingsClick(){
		chrome.tabs.query({url: chrome.runtime.getURL("options.html")}, function(tabs) {
		    if (tabs.length) {
		        chrome.tabs.update(tabs[0].id, {active: true});
		        chrome.tabs.reload();
		    } 
		    else {
		        chrome.tabs.create({url: chrome.runtime.getURL("options.html")});
		    }
		});
	}

	render() {
		if (this.props.status === "not stopped") {
			return (
				<div id="outerWrapper">
					<div id="TimerComponent">
						<Timer 
							totalTime = {this.props.totalTime} 
							domain = {this.props.domain}
							isShortTime = {this.props.isShortTime}
							status = {this.props.status}
						/>
					</div>
					<div id="buttons">
	          			<button id="domainButton" onClick={this.handleDomainClick}>Show Domain List</button>
	          			<button id="settingsButton" onClick={this.handleSettingsClick}>Settings</button>
	          		</div>
	       		</div>
			)
		}

		//Domain timer is stopped
		else {
			return (
				<div>
					<div>
			            <Timer 
							totalTime = {this.props.totalTime} 
							domain = {this.props.domain}
							isShortTime = {this.props.isShortTime}
							status = {this.props.status}
						/>
          			</div>
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