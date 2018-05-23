import React from "react";
import { hot } from "react-hot-loader";

class TimerComponent extends React.Component {
  constructor(props){
  	super(props);
    this.state = {
      hours: 0, 
      minutes: 0, 
      seconds:0,
      domain: this.props.domain,
      startTime: Date.now()
    };
  	this.calcTimer = this.calcTimer.bind(this);
  }

  /*Calculate how long the browser has been active*/
  calcTimer(){
    let currentTime = Date.now();
    let hours = Math.floor( (currentTime - this.state.startTime + this.props.totalTime)/3600000 );
    let minutes = Math.floor( ((currentTime - this.state.startTime + this.props.totalTime)/60000) % 60 );
    let seconds = Math.floor( ((currentTime - this.state.startTime + this.props.totalTime)/1000) % 60 );;
  	this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
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
          <p>This page has been on {this.state.domain} for {this.state.hours} hours {this.state.minutes} minutes {this.state.seconds} seconds.</p>
        </div>
    )
  }
};

export default hot(module)(TimerComponent)