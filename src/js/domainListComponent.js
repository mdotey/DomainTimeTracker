import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";

var console = chrome.extension.getBackgroundPage().console;
class DomainListComponent extends React.Component {
	constructor(props){
		super(props);
	}

	calcTimer(milliseconds){
	    let hours = Math.floor( milliseconds/3600000 );
	    let minutes = Math.floor( (milliseconds/60000) % 60 );
	    let seconds = Math.floor( (milliseconds/1000) % 60 );
	  	
	    return (<div>{hours} hours {minutes} minutes {seconds} seconds</div>)
	  }

	render(){
    	const domainDictionary = this.props.domains;  // Essentially does: const vals = this.state.vals;
  		return (
    		<div>
      			{
   					 Object.entries(domainDictionary)
    					.map( ([key, value]) => <h2 key={key}>{key}{this.calcTimer(value)}</h2> )
  				}
    		</div>
  		)
  	}
};



chrome.runtime.sendMessage({request: "getDomainList"}, function(response) {
	const domainDict = response.domainList;
	render(
	    <DomainListComponent domains = {domainDict} />,
	    window.document.getElementById("domain-container")
	);
});

export default hot(module)(DomainListComponent)