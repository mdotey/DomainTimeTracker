import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";

var console = chrome.extension.getBackgroundPage().console;
class DomainListComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}

	render() {
    	return (
      		<div>
        		<h1>We did it</h1>
      		</div>
    	)
	}
};

render(
    <DomainListComponent/>,
    window.document.getElementById("domain-container")
);

export default hot(module)(DomainListComponent)