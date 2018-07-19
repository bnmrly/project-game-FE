import React, { Component } from 'react';
import './Job.css';
import { connect } from 'react-redux';
import {
  setUserWage,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import store from '../../redux/index';
import { initialisePlayer } from '../../firebase/fb';

class Job extends Component {
  render() {
    return (
      <section className="job">
        <ul className="job__list ul">
          <li className="job__list-item">
            Chef: Know your onions from your oranges!
          </li>
          <br />
          <li className="job__list-item">
            Teacher: Know your ABC's from your 123's!
          </li>
          <br />
          <li className="job__list-item">
            Doctor: Know your funny bone from your hip bone!
          </li>
        </ul>
        <button
          className="button button__1 grid__1"
          value={100}
          onClick={this.props.handleClick}
        >
          Chef
        </button>
        <button
          className="button button__2 grid__2"
          value={200}
          onClick={this.props.handleClick}
        >
          Teacher
        </button>
        <button
          className="button button__3 grid__3"
          value={300}
          onClick={this.props.handleClick}
        >
          Doctor
        </button>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(setUserWage(e.target.value));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    financialInfo: store.playerFinancialInfo
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Job);
