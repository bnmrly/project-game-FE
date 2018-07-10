import React, { Component } from 'react';
import './App.css';
import Dialogue from './components/Dialogue/Dialogue';
import Wallet from './components/Wallet/Wallet';
import Bank from './components/Bank/Bank';
import Card from './components/Card/Card'
import Login from "./components/Login/Login"


// Conditionaly render login screen or below
// show loggeddn user name

class App extends Component {
  render() {
    return (<React.Fragment>
      <Login/>
      <div className="app__game-container">
       {/* <section className="app__turncounter">turn count goes here</section>
       <Dialogue />
        <Wallet />
         <Bank /> */}
      </div>
      </React.Fragment>
    );
  }
}



export default App;
