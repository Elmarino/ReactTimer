import React, { Component } from 'react';
import './App.css';

import validateEmail from './functions.js'

class App extends Component {

  componentDidMount(){
    this.nextPart = this.nextPart.bind(this)
    this.previousPart = this.previousPart.bind(this)
  }
  
  state = {
    whichPart: 1,
    identity:null,
    framework: null
  }

  previousPart(){
    this.setState({
      whichPart: this.state.whichPart - 1
    })
  }

  nextPart(){
    this.setState({
      whichPart: this.state.whichPart + 1
    })
  }

  selectPart(){
    switch (this.state.whichPart) {
      case 1:
        return <FirstPart save={this.saveIdentityData.bind(this)}/>
        // eslint-disable-next-line
        break;
      
      case 2:
        return <SecondPart save={this.saveFrameworkData.bind(this)} prev={this.previousPart.bind(this)}/>
        // eslint-disable-next-line
        break;

      case 3:
        return <Recap identity={this.state.identity} outil={this.state.framework} prev={this.previousPart.bind(this)}/>
        // eslint-disable-next-line
        break;
    
      default:
        break;
    }
  }

  saveIdentityData(datas){
 
    let empty = false
    let elementKey = null

    for (const key in datas) {
      if (datas.hasOwnProperty(key)) {
        const element = datas[key];
        if (element === "") {
          empty = true
          elementKey = key
          break;
        }
      }
    }

    if (empty) {
      alert('Le champ '+elementKey+ ' n\'a pas été fourni')
    } else{
      if ( validateEmail(datas.email) ) {
        // All fields are good
        this.setState({
          identity: datas
        })
        this.nextPart()
      } else{
        alert('Votre adresse email est invalide !')
      }
    }

  }

  saveFrameworkData(data){
    this.setState({ framework:data })
    this.nextPart()
  }

  render() {
    return (
      <div>
        <div className="App-header">
        <p>PARTIE {this.state.whichPart}</p>

          {this.selectPart()}

        </div>
      </div>
    );
  }
}

class FirstPart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      civilite: '',
      prenom: '',
      nom: '',
      email: '',
      tel: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    let value = null
    const isValid = target.validity.valid
    const name = target.name;
    isValid ? value = target.value: value = this.state[name];

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const identity = {
      civilité: this.state.civilite,
      prénom: this.state.prenom,
      nom: this.state.nom,
      email: this.state.email,
      téléphone: this.state.tel
    }
    this.props.save(identity)
  }

  render() {

    let { civilite, prenom, nom, email, tel } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <form className="formulaire" onSubmit={this.handleSubmit}>
            
            <label>
              Civilité:
              <select name="civilite" value={civilite} onChange={this.handleChange}>
                <option disabled></option>
                <option value="monsieur">Monsieur</option>
                <option value="madame">Madame</option>
              </select>
            </label>

            <label>
              Prénom:
              <input
                name="prenom"
                type="text"
                value={prenom}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Nom:
              <input
                name="nom"
                type="text"
                value={nom}
                onChange={this.handleChange}
              />
            </label>

            <label>
              E-mail:
              <input
                name="email"
                type="text"
                value={email}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Téléphone:&nbsp;+33
              <input
                name="tel"
                type="text"
                pattern="[0-9]*"
                value={tel}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Suivant" />
          </form>
        </header>
      </div>
    );
  }
}

class SecondPart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      framework: '',
      other: '',
    };

    this.previous = this.previous.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    let value = null
    const isValid = target.validity.valid
    const name = target.name;
    isValid ? value = target.value: value = this.state[name];
    this.setState({
      [name]: value
    });
  }

  previous(){
    this.props.prev()
  }

  next(){
    if (this.state.framework !== "") {
      if (this.state.framework === "Autre") {
        if (this.state.other === "") {
          alert('Vous n\'avez pas renseigné votre framework préféré')
        } else{
          this.props.save(this.state.other)
        }
      } else{
        this.props.save(this.state.framework)
      }
    } else{
      alert('Vous n\'avez pas selectionné votre framework préféré')
    }
  }

  other(){
    if (this.state.framework === "Autre"){
      return(
        <label>
          Autre:
          <input
            name="other"
            type="text"
            value={this.state.other}
            onChange={this.handleChange}
            required />
        </label>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form className="formulaire" onSubmit={this.handleSubmit}>
          
            <label htmlFor="vue">
              <input name="framework" type="radio" id="vue" value="Vue" onChange={this.handleChange}/>
              Vue
            </label>
            <br/>
            <label htmlFor="angular">
              <input name="framework" type="radio" id="angular" value="Angular" onChange={this.handleChange}/>
              Angular
            </label>
            <br/>
            <label htmlFor="symfony">
              <input name="framework" type="radio" id="symfony" value="Symfony" onChange={this.handleChange}/>
              Symfony
            </label>
            <br/>
            <label htmlFor="autre">
              <input name="framework" type="radio" id="autre" value="Autre" onChange={this.handleChange}/>
              Autre
            </label>
            <br/>
            {this.other()}

            <input type="button" value="Précédent" onClick={this.previous}/>
            <input type="button" value="Suivant" onClick={this.next.bind(this)}/>
          </form>
        </header>
      </div>
    );
  }
}

class Recap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      identity: this.props.identity,
      framework: this.props.outil,
      sended: false
    };

    this.previous = this.props.prev
    this.send = this.send.bind(this)
  }

  componentDidMount(){
    console.log(this.state)
  }

  send(){
    this.setState({
      sended: true
    })
  }

  isSended(){
    let { civilité, prénom, nom, email, téléphone } = this.state.identity;  
    let { framework } = this.state;  

    if (this.state.sended) {
      return <p>Vos informations ont été envoyées !</p>      
    } else{
      return(
        <div>
          <p>Vérifiez vos informations</p>
          <p>Vous êtes: {civilité} {nom} {prénom}</p>          
          <p>E-mail:  {email}</p>          
          <p>Téléphone:  {téléphone}</p>  
          <p>Vous aimez: {framework}</p> 

          <input type="button" value="Modifier des informations" onClick={this.previous}/>
          <input type="button" value="Envoyer" onClick={this.send}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.isSended()}
        </header>
      </div>
    );
  }
}

export default App;
