import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import "../css/popup.css";
var console = chrome.extension.getBackgroundPage().console;

class SettingsComponent extends React.Component {
	constructor(props){
		super(props);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.state = {shortTimeChecked: !this.props.shortTimeChecked};
	}

	handleTimeChange(){
		chrome.runtime.sendMessage({request: "toggleTime"}, function(response){
			console.log(response.status);	
		});
		this.setState({shortTimeChecked: !this.state.shortTimeChecked})
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
			</div>
		)
	}
};

chrome.runtime.sendMessage({request: "getSettings"}, function(response){
	const isShortTimeChecked = !response.shortTime;
	render(
		<SettingsComponent shortTimeChecked = {isShortTimeChecked}/>,
		window.document.getElementById("settings-container")
	);
});

export default hot(module)(SettingsComponent)