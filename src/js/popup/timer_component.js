import React from "react";
import { hot } from "react-hot-loader";

class TimerComponent extends React.Component {
  constructor(props){
  	super(props);
    this.state = {
      hours: 0, 
      minutes: 0, 
      seconds:0
    };
  	this.calcTimer = this.calcTimer.bind(this);
  }

  /*Calculate how long the browser has been active*/
  calcTimer(){
    let currentTime = Date.now();
    let hours = Math.floor( (currentTime - this.props.startingTimer)/3600000 );
    let minutes = Math.floor( (currentTime - this.props.startingTimer)/60000 );
    let seconds = Math.floor( (currentTime - this.props.startingTimer)/1000 );;
  	this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  componentDidMount() {
  	this.interval = setInterval(() => this.calcTimer(), 500);
  }

  componentwillUnmount(){
  	clearInterval(this.interval);
  }

  render () {
    return (
      <div>
        <p>This page has been active for {this.state.hours} hours {this.state.minutes} minutes {this.state.seconds} seconds.</p>
      </div>
    )
  }
};

export default hot(module)(TimerComponent)