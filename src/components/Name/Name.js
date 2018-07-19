import React, { Component } from 'react';
import './Name.css';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import {
  nameSetterEvent,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import { initialisePlayer } from '../../firebase/fb';

class Name extends Component {
  state = {
    name: ''
  };
  render() {
    return (
      <section className="name">
        <p>Please enter your name</p>
        <input
          required="true"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button
          className="button__login"
          value={this.state.name}
          onClick={() => {
            initialisePlayer(this.state.name);
          }}
        >
          Submit
        </button>
        {this.props.usernameTaken ? <div>Username is taken!</div> : <div />}
      </section>
    );
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
}
const mapStateToProps = store => {
  return { usernameTaken: store.playerMetaData.usernameTaken };
};
export default connect(
  mapStateToProps,
  null
)(Name);
