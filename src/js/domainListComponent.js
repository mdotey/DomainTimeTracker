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
			stopped: this.props.stopped
		};
		this.handleResetClick = this.handleResetClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);
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
	  			<div>
		            <div className="digit">{hours}</div>
		            <div className="word">H</div>
		            <div className="digit">{minutes}</div>
		            <div className="word">M</div> 
		            <div className="digit">{seconds}</div> 
		            <div className="word">S</div>
          		</div>)
	  	} 
	  	else {
	    	return (
	    		 <div>
		            <div className="digit">{hours}</div>
		            <div className="word">hours</div>
		            <div className="digit">{minutes}</div>
		            <div className="word">minutes</div> 
		            <div className="digit">{seconds}</div> 
            		<div className="word">seconds</div>
          		</div>)
	  	}
	  }

	handleResetClick(domain) {
		chrome.runtime.sendMessage({request: "resetDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({removed: [...this.state.removed, domain]});
	}

	handleStopClick(domain) {
		chrome.runtime.sendMessage({request: "stopDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({stopped: [...this.state.stopped, domain]});
	}

	handleStartClick(domain) {
		chrome.runtime.sendMessage({request: "resumeDomain", domain: domain}, function(response){
			console.log(response.status);	
		});

		let index = this.state.stopped.indexOf(domain);
    	this.setState(function(prevState){
    		return { stopped: prevState.stopped.filter(function(val, i) {
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
	   					//check if the domain is currently stopped
	   					if (!this.state.stopped.includes(key)) {
		    				return (
			    				<div className="list-group">
			    				{	//Check if domain has been deleted
			    					(this.state.removed.includes(key) == false) &&
			    					<div> 							
			    						<div key={key} className="list-header">{key}</div> 
			    						{this.calcTimer(value)}
			    						<button id={key + "remove"} onClick={this.handleResetClick.bind(this, key)}>Clear</button>
			    						<button id={key + "stop"} onClick={this.handleStopClick.bind(this, key)}>Stop</button>
			  						</div>	  								
			  					}	  							
			  					</div>
		  					)
		  				}

		  				else {
		  					return (
			    				<div className="list-group">
			    				{	//Check if domain has been deleted
			    					(this.state.removed.includes(key) == false) &&
			    					<div> 							
			    						<div key={key} className="list-header">{key}</div> 
			    						<div className="list-timer">{this.calcTimer(value)}</div>
			    						<div className="stopped">Stopped!</div>
			    						<div className="list-buttons">
				    						<button id={key + "remove"} onClick={this.handleResetClick.bind(this, key)}>Clear</button>
				    						<button id={key + "start"} onClick={this.handleStartClick.bind(this, key)}>Start</button>
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



chrome.runtime.sendMessage({request: "getDomainList"}, function(response) {
	const domainList = response.domainList;
	const isShortTime = response.shortTime;
	const stoppedDomains = response.stopped;
	render(
		<DomainListComponent 
			domains = {domainList} 
			isShortTime = {isShortTime} 
			stopped = {stoppedDomains}/>,
	    window.document.getElementById("domain-container")
	);
});

export default hot(module)(DomainListComponent)