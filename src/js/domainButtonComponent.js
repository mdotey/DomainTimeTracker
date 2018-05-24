import React from "react";
import { hot } from "react-hot-loader";


const console = chrome.extension.getBackgroundPage().console;

class domainButtonComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	handleDomainClick() {
		const domainListURL = chrome.runtime.getURL("domainList.html");
		chrome.tabs.create({url: domainListURL});
	}

	render() {
		return(
			<div>
				<button id="domainButton" onClick={this.handleDomainClick}>Show Domain List</button>
			</div>
		)
	}
};

export default hot(module)(domainButtonComponent)