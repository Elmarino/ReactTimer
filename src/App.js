import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      label: '',
      timers: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let newTimer = {
      'label': this.state.label,
      'minutes': this.state.minutes,
      'seconds': this.state.seconds
    }

    this.setState({
      timers: [...this.state.timers, newTimer]
    })

    console.log(this.state.timers)
  }

  handleInputChange(event) {
    const target = event.target;
    let value = null
    const isValid = target.validity.valid
    const name = target.name;
    isValid ? value = target.value: value = this.state[name];

    this.setState({
      [name]: value
    });
  }

  render() {

    const allTimers = this.state.timers.map((timer, i)=>{
      return(
        <div className='all-timer' key={i}>
          <Timer titleElement={timer.label} timeMinutes={timer.minutes}  timeSeconds={timer.seconds} timeElement={this.state.timeValue}/>
        </div>
      )
    })
    

    return (
      <div>
        <h1>Vos minuteurs</h1>
        <div>
          <form onSubmit={this.handleFormSubmit} className='minuteur-timer'>
            <div>
              <label>
                Label du minuteur:
                <input
                  name="label"
                  type="text"
                  value={this.state.label}
                  onChange={this.handleInputChange}
                  required />
              </label>
              <label>
                Minutes:
                <input
                  name="minutes"
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.minutes}
                  onChange={this.handleInputChange}
                  required />
              </label>
              <br />
              <label>
                Secondes:
                <input
                  name="seconds"
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.seconds}
                  onChange={this.handleInputChange}
                  required />
              </label>
              <br/>
            </div>
            <input type="submit" value="Créer un minuteur" />            
          </form>
        </div>
        <div className='wrapper-timers'>
          { allTimers }
        </div>
      </div>
    );
  }
}

export default App;