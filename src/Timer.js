import React, { Component } from 'react';


class Timer extends Component {
    constructor(props){
      super(props)
      this.state = {
        seconds: props.timeElement,
        timeLeft: {},
        ended: null,
        message: null,
        nameElement: props.titleElement
      }

      // initialize values related to components
      this.initialSeconds = props.timeElement
      this.timer = null

      // Bind this to our functions
      this._countDown = this._countDown.bind(this)
      this._startPauseTimer = this._startPauseTimer.bind(this)
    }

    componentDidMount(){
      // Init values
      this.setState({
        timeLeft: this._secondsToTime(this.initialSeconds),
        seconds: this.initialSeconds
      })
      this._isThisTheEnd()
    }

    _countDown() {
        
        // Counter
        let seconds = this.state.seconds - 1;
        this.setState({
            timeLeft: this._secondsToTime(seconds),
            seconds: seconds,
        });
      
        // Check if the timer is ended
        if (seconds === 0) {
            clearInterval(this.timer);
            this.timer = null
            this.setState({
                timeLeft: this._secondsToTime(this.initialSeconds),
                seconds: this.initialSeconds,
                ended: true,
            })
        }
        // Relate the message
        this._isThisTheEnd()
    }

    // Function to start & pause (not done) timer
    _startPauseTimer(){
      if (this.timer == null) {
        this.timer = setInterval(this._countDown, 1000)
        this.setState({
          ended: false
        })
      } else{
        // If pause
      }
      this._isThisTheEnd()
    }

    _secondsToTime(secs){
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
          "m": minutes < 10 ? '0'+minutes: minutes,
          "s": seconds < 10 ? '0'+seconds:seconds
      };
      return obj;
    }

    // Change message according to timer
    _isThisTheEnd(){
      if (this.state.ended == null) {
        this.setState({
          message: <button onClick = {this._startPauseTimer}>Lancer le chrono des {this.state.nameElement}</button>
        })
      } else{
        if (this.state.ended) {
            this.setState({
                message: <p>Vos {this.state.nameElement} sont cuites</p>
            })
        }
        else{
            this.setState({
                message: <p>Cuisson en cours</p>
            })
        }
      }
    }
    
    render() {
        
        return (
            <div>
            <p>{this.state.nameElement}</p>
            <p>{this.state.timeLeft.m} minutes<br/>{this.state.timeLeft.s} secondes</p>
            {this.state.message}
            </div>
        );
    }
}

export default Timer
  