import React from "react";
import { hot } from "react-hot-loader";
import Timer from "./timerComponent.js";

class ParentComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	handleDomainClick() {
		const domainListURL = chrome.runtime.getURL("domainList.html");
		chrome.tabs.create({url: domainListURL});
	}
	handleSettingsClick(){
		const optionsURL = chrome.runtime.getURL("options.html");
		chrome.tabs.create({url: optionsURL})
	}

	render() {
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
};



export default hot(module)(ParentComponent)