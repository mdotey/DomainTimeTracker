import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import "../css/popup.css";

var console = chrome.extension.getBackgroundPage().console;
class DomainListComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {deleted: []};
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
		this.calcTimer = this.calcTimer.bind(this);
	}

	calcTimer(milliseconds){
	    let hours = Math.floor( milliseconds/3600000 );
	    let minutes = Math.floor( (milliseconds/60000) % 60 );
	    let seconds = Math.floor( (milliseconds/1000) % 60 );
	  	
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

	handleRemoveClick(domain) {
		chrome.runtime.sendMessage({request: "removeDomain", domain: domain}, function(response){
			console.log(response.status);	
		});
		this.setState({deleted: [...this.state.deleted, domain]});
	}

	render(){
    	const domains = this.props.domains; 
    	console.log("rendering");
  		return (
    		<div>
      			{
   					Object.entries(domains).map( ([key, value]) => {
    					return (
	    					<div className="list-group">
	    					{	//Check if domain has been deleted
	    						(this.state.deleted.includes(key) == false) &&
	    						<div> 							
	    							<div key={key} className="list-header">{key}</div> 
	    							{this.calcTimer(value)}
	    							<button id={key} onClick={this.handleRemoveClick.bind(this, key)}>Remove {key}</button>
	  							</div>	  								
	  						}	  							
	  						</div>
  					)})
  						
  				}		
    		</div>
  		)
  	}
};



chrome.runtime.sendMessage({request: "getDomainList"}, function(response) {
	const domainList = response.domainList;
	const isShortTime = response.shortTime;
	render(
		<DomainListComponent domains = {domainList} isShortTime = {isShortTime} />,
	    window.document.getElementById("domain-container")
	);
});

export default hot(module)(DomainListComponent)