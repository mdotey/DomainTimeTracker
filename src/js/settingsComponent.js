import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import "../css/popup.css";

var console = chrome.extension.getBackgroundPage().console;

class SettingsComponent extends React.Component {
	constructor(props){
		super(props);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleUnblockClick = this.handleUnblockClick.bind(this);
		this.state = {
			shortTimeChecked: !this.props.shortTimeChecked,
			unblockedDomains: []
		};
	}

	handleTimeChange(){
		chrome.runtime.sendMessage({request: "toggleTime"}, function(response){
			console.log(response.status);	
		});
		this.setState({shortTimeChecked: !this.state.shortTimeChecked})
	}

	handleUnblockClick(domain){
		chrome.runtime.sendMessage({request: "unblock", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({unblockedDomains: [...this.state.unblockedDomains, domain]});
		console.log("settings state change " + this.state.unblockedDomains);
	}

	render(){
		console.log("rendering settings");
		return(
			<div>
				<label className="change-time">
					<input id="short-time" 
						type="checkbox" 
						checked={!this.state.shortTimeChecked} 
						onChange={this.handleTimeChange}/>
					Change H, M, S to Hours, Minutes, Seconds
				</label>
				<div className="blocked-text">	
					Blocked domains:
					{
						this.props.blockedDomains.map( (blockedDomain) => {
							return (
							<div className="blocked-group">
							{	(this.state.unblockedDomains.includes(blockedDomain) == false) && 
									<div className="blocked-domain">
										{blockedDomain}
										<button className="block-button" onClick={this.handleUnblockClick.bind(this, blockedDomain)}>Unblock</button>
									</div>
							}	
							</div>
						)}) 
					}
				</div>
			</div>
		)
	}
};

chrome.runtime.sendMessage({request: "getSettings"}, function(response){
	const isShortTimeChecked = !response.shortTime;
	const blockedDomains = response.blockedDomains;
	render(
		<SettingsComponent 
			shortTimeChecked = {isShortTimeChecked}
			blockedDomains = {blockedDomains}/>,
		window.document.getElementById("settings-container")
	);
});

export default hot(module)(SettingsComponent)