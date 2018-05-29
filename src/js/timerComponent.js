import React from "react";
import { hot } from "react-hot-loader";


var console = chrome.extension.getBackgroundPage().console;

class TimerComponent extends React.Component {
  constructor(props){
  	super(props);
    this.state = {
      hours: 0, 
      minutes: 0, 
      seconds:0,
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
        <div>
            <div className="digit">{this.state.hours}</div>
            <div className="word">H</div>
            <div className="digit">{this.state.minutes}</div>
            <div className="word">M</div> 
            <div className="digit">{this.state.seconds}</div> 
            <div className="word">S</div>
          </div>
      )
    }
    else {
      return(
        <div>
          <div className="digit">{this.state.hours}</div>
          <div className="word">hours</div>
          <div className="digit">{this.state.minutes}</div>
          <div className="word">minutes</div> 
          <div className="digit">{this.state.seconds}</div> 
          <div className="word">seconds</div>
        </div>
      )
    }
  }



  /*Calculate the timer every second when the popup is open*/
  componentDidMount() {
  	this.interval = setInterval(() => this.calcTimer(), 1000);
  }

  componentWillUnmount(){
  	clearInterval(this.interval);
  }

  render () {
    return (
        <div>
          <div className="popup-header">{this.props.domain}</div>  
          {this.renderHelper()}
        </div>
    )
  }
};

export default hot(module)(TimerComponent)