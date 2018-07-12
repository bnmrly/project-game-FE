import React, { Component } from 'react';
import './App.css';
import Display from './components/Display/Display';
import Wallet from './components/Wallet/Wallet';
import Bank from './components/Bank/Bank';
import Card from './components/Card/Card'
import Login from "./components/Login/Login"
import store from "./redux/index"
import Job from './components/Job/Job';
import { connect } from 'react-redux'

// {...store, id : "id"}

// bank needs a bank object
// bank button will on click change story object to bank object in dialogue
// bank object will contain an isActive key, so that the bank link can be conditionally rendered with an
// exit bank link. which will take you back to the story object

class App extends Component {
  render() {
    console.log(store.getState())
    return (<React.Fragment>
      {!this.props.id ? <Login /> :
        <div className="app__game-container">
          <section className="app__turncounter">turn count goes here</section>
          <Display />
          <Wallet />
          <Bank />
          <Job />
        </div>}
    </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    id: store.playerInfo.id
  };
};

export default connect(
  mapStateToProps,
  null
)(App);

