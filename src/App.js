import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

class App extends Component {
  constructor(){
    super()
    this.state = {
      elementName: null,
      timeValue : null,
      clicked: false
    }
  }

  _setTime(name, time){
    this.setState({
      elementName: name,
      timeValue: time,
      clicked: true
    })
  }

  render() {

    const { elementName, timeValue, clicked } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            // Visible if we have not clicked
            !clicked && (
              <div className="buttons">
                <button className="button_choose" 
                  onClick = { ()=>this._setTime('Pates déjà cuites', 180)}
                >
                  Lancer le chrono des pates
                </button>

                <button className="button_choose" 
                  onClick = {()=>this._setTime('Oeufs déjà durs', 10)}
                >
                  Lancer le chrono des oeufs
                </button>

                <button className="button_choose" 
                  onClick = {()=>this._setTime('Pommes sautées', 600)}
                >
                  Lancer le chrono pour la compote de pomme
                </button>
              </div>
            )
          }
          { 
            //Display timer only if we have the 2 data needed
            (elementName && timeValue) && <Timer titleElement={this.state.elementName} timeElement={this.state.timeValue}/> 
          }
        </header>
      </div>
    );
  }
}

export default App;