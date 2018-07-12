import React, { Component } from 'react';
import './Name.css';
import { connect } from 'react-redux';
import {
  nameSetterEvent,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';

class Name extends Component {
  state = {
    name: ''
  };
  render() {
    return (
      <section className="name">
        <input
          required="true"
          placeholder="Please enter your name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button value={this.state.name} onClick={this.props.handleClick}>
          Submit
        </button>
      </section>
    );
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(nameSetterEvent(e.target.value));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    name: store.playerMetaData.name
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name);
