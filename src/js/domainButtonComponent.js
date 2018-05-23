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
		/*chrome.runtime.sendMessage({request: "getDomainList"}, function(response) {
			const domainList = response.domainList;
		/*	const domainListURL = chrome.runtime.getURL("domainList.html");
			console.log("test10 " + domainList + " " + domainListURL);
			chrome.tabs.create({url: domainListURL}, function(tab) {
				console.log("inside create");
				//domainTabID = tab.sessionid;
				//console.log("tab ID inside" + tab.sessionid);
				render(
					//<domainList domainList = {domainList}/>,
					<h1>test</h1>,
					 document.getElementById("domain-container")
				);
			});
		});*/
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