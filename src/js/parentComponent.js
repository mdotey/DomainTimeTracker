import React from "react";
import { hot } from "react-hot-loader";
import Timer from "./timerComponent.js";
import DomainButton from "./domainButtonComponent.js";

class ParentComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div id="outerWrapper">
				<div id="TimerComponent">
					<Timer 
						totalTime = {this.props.totalTime} 
						domain = {this.props.domain}
					/>
				</div>
				<div id="buttons">
          			<DomainButton />
          			<button id="settingsButton">Settings</button>
          		</div>
       		</div>
		)
	}
};



export default hot(module)(ParentComponent)