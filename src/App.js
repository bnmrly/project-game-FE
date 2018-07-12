import React, { Component } from 'react';
import './App.css';
import Display from './components/Display/Display';
import Wallet from './components/Wallet/Wallet';
import Bank from './components/Bank/Bank';
import Login from './components/Login/Login';
import store from './redux/index';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.id ? (
          <Login />
        ) : (
          <div className="app__game-container">
            <section className="app__turncounter">turn count goes here</section>
            <Display />
            <Wallet />
            <Bank />
          </div>
        )}
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
