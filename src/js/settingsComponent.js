import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import "../css/popup.css";

var console = chrome.extension.getBackgroundPage().console;

class SettingsComponent extends React.Component {
	constructor(props){
		super(props);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handlResumeClick = this.handleResumeClick.bind(this);
		this.state = {
			shortTimeChecked: !this.props.shortTimeChecked,
			resumedDomains: []
		};
	}

	handleTimeChange(){
		chrome.runtime.sendMessage({request: "toggleTime"}, function(response){
			console.log(response.status);	
		});
		this.setState({shortTimeChecked: !this.state.shortTimeChecked})
	}

	handleResumeClick(domain){
		chrome.runtime.sendMessage({request: "resumeDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({resumedDomains: [...this.state.resumedDomains, domain]});
	}

	render(){
		return(
			<div>
				<label className="change-time">
					<input id="short-time" 
						type="checkbox" 
						checked={!this.state.shortTimeChecked} 
						onChange={this.handleTimeChange}/>
					Change H, M, S to Hours, Minutes, Seconds
				</label>
				<div className="stopped-text">	
					Stopped domains:
					{
						this.props.stoppedDomains.map( (stoppedDomain) => {
							return (
							<div className="stopped-group">
							{	(this.state.resumedDomains.includes(stoppedDomain) == false) && 
									<div className="stopped-domain">
										<button className="resume-button" onClick={this.handleResumeClick.bind(this, stoppedDomain)}>Resume</button>
										{stoppedDomain}	
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
	const stoppedDomains = response.stoppedDomains;
	render(
		<SettingsComponent 
			shortTimeChecked = {isShortTimeChecked}
			stoppedDomains = {stoppedDomains}/>,
		window.document.getElementById("settings-container")
	);
});

export default hot(module)(SettingsComponent)