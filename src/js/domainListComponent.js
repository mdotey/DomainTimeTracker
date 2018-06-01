import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import "../css/popup.css";

var console = chrome.extension.getBackgroundPage().console;

class DomainListComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			removed: [], 
			paused: this.props.paused
		};
		this.handleClearClick = this.handleClearClick.bind(this);
		this.handlepauseClick = this.handlepauseClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.calcTimer = this.calcTimer.bind(this);
	}

	calcTimer(milliseconds){
	    let hours = Math.floor( milliseconds/3600000 );
	    let minutes = Math.floor( (milliseconds/60000) % 60 );
	    let seconds = Math.floor( (milliseconds/1000) % 60 );
	  	
	  	//round seconds to 1 if site was active for less than 1 second
	  	if (seconds == 0) {
	  		seconds = 1;
	  	}

	  	if (this.props.isShortTime){
	  		return ( 
	  			<div className="clock-parent">
		  			<div className="clock-wrapper">
			            <div className="digit">{hours}</div>
			            <div className="colon">:</div>
			            <div className="digit">{minutes}</div>
			            <div className="colon">:</div> 
			            <div className="digit">{seconds}</div> 
	          		</div>
          		</div>
          		)
	  	} 
	  	else {
	    	return (
	    		<div className="clock-parent">
		    		<div className="clock-wrapper">
			            <div className="digit">{hours}</div>
			            <div className="word">H</div>
			            <div className="digit">{minutes}</div>
			            <div className="word">M</div> 
			            <div className="digit">{seconds}</div> 
	            		<div className="word">S</div>
	          		</div>
          		</div>)
	  	}
	  }

	handleClearClick(domain) {
		chrome.runtime.sendMessage({request: "ClearDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({removed: [...this.state.removed, domain]});
	}

	handlepauseClick(domain) {
		chrome.runtime.sendMessage({request: "pauseDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({paused: [...this.state.paused, domain]});
	}

	handleStartClick(domain) {
		chrome.runtime.sendMessage({request: "resumeDomain", domain: domain}, function(response){
			console.log(response.status);	
		});

		//Remove from paused array
		let index = this.state.paused.indexOf(domain);
    	this.setState(function(prevState){
    		return { paused: prevState.paused.filter(function(val, i) {
      			return i !== index;
    		})};
		});
	}

	render(){
    	const domains = this.props.domains;   	 
	  		return (
	    		<div>
	      		{
	   				Object.entries(domains).map( ([key, value]) => {
	   					//check if the domain is currently paused
	   					if (!this.state.paused.includes(key)) {
		    				return (
			    				<div className="list-group">
			    				{	//Check if domain has been removed
			    					(this.state.removed.includes(key) == false) &&
			    					<div> 							
			    						<div key={key} className="list-header">{key}</div> 
			    						{this.calcTimer(value)}
			    						<div className="list-buttons">
				    						<button id={key + "remove"} onClick={this.handleClearClick.bind(this, key)}>Clear</button>
				    						<button id={key + "pause"} onClick={this.handlepauseClick.bind(this, key)}>Pause</button>
				    					</div>
			  						</div>	  								
			  					}	  							
			  					</div>
		  					)
		  				}

		  				else {
		  					return (
			    				<div className="list-group">
			    				{	//Check if domain has been removed
			    					(this.state.removed.includes(key) == false) &&
			    					<div> 							
			    						<div key={key} className="list-header">{key}</div>
			    						<div className="paused-listing">Paused!</div> 
			    						{this.calcTimer(value)}			    						
			    						<div className="list-buttons">
				    						<button id={key + "remove"} onClick={this.handleClearClick.bind(this, key)}>Clear</button>
				    						<button id={key + "start"} onClick={this.handleStartClick.bind(this, key)}>Resume</button>
				    					</div>
			  						</div>	  								
			  					}	  							
			  					</div>
		  					)
		  				}

	  				})
	  						
	  			}		
	    		</div>
	  		)
  	}
};


//Render the above Domain List Component
chrome.runtime.sendMessage({request: "getDomainList"}, function(response) {
	const domainList = response.domainList;
	const isShortTime = response.shortTime;
	const pausedDomains = response.paused;
	render(
		<DomainListComponent 
			domains = {domainList} 
			isShortTime = {isShortTime} 
			paused = {pausedDomains}/>,
	    window.document.getElementById("domain-container")
	);
});

export default hot(module)(DomainListComponent)