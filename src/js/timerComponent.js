import React from "react";
import { hot } from "react-hot-loader";


var console = chrome.extension.getBackgroundPage().console;

class TimerComponent extends React.Component {
  constructor(props){
  	super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      startTime: Date.now()
    };
  	this.calcTimer = this.calcTimer.bind(this);
    this.renderHelper = this.renderHelper.bind(this);
  }

  /*Calculate how long the browser has been active*/
  calcTimer(){
    let currentTime = Date.now();
    let hours = Math.floor( (currentTime - this.state.startTime + this.props.totalTime)/3600000 );
    let minutes = Math.floor( ((currentTime - this.state.startTime + this.props.totalTime)/60000) % 60 );
    let seconds = Math.floor( ((currentTime - this.state.startTime + this.props.totalTime)/1000) % 60 );
  	this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  renderHelper() {
    if (this.props.isShortTime) {
      return(
        <div className="clock-parent">
          <div className="clock-wrapper">
              <div className="digit" type="text/css">{this.state.hours}</div>
              <div className="colon">:</div>
              <div className="digit" type="text/css">{this.state.minutes}</div>
              <div className="colon">:</div> 
              <div className="digit">{this.state.seconds}</div> 
            </div>
        </div>
      )
    }
    else {
      return(
        <div className="clock-parent">
          <div className="clock-wrapper">
            <div className="digit" type="text/css">{this.state.hours}</div>
            <div className="word">H</div>
            <div className="digit" type="text/css">{this.state.minutes}</div>
            <div className="word">M</div> 
            <div className="digit" type="text/css">{this.state.seconds}</div> 
            <div className="word">S</div>
          </div>
        </div>
      )
    }
  }



  /*Calculate the timer every second when the popup is open*/
  componentDidMount() {
    if (this.props.status == "not paused") {
  	  this.interval = setInterval(() => this.calcTimer(), 1000);
    }
  }

  componentWillUnmount(){
    if (this.props.status == "not paused") {
  	  clearInterval(this.interval);
    }
  }

  render () {
    if (this.props.status === "not paused"){
      return (
          <div className="popup-wrapper">
            <div className="popup-header">{this.props.domain}</div>  
            {this.renderHelper()}
          </div>
      )
    }
    else {
      return (
        <div className="popup-wrapper">
          <div className="popup-header">{this.props.domain}</div>
          <div className="paused-popup">Paused</div>  
          {this.calcTimer()}
          {this.renderHelper()}
        </div>
      )
    }
  }
};

export default hot(module)(TimerComponent)