import React, { Component } from 'react';
import './Job.css';
import { connect } from 'react-redux';
import {
  setUserWage,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import store from '../../redux/index';

class Job extends Component {
  render() {
    return (
      <section className="job">
        <ul className="job__list ul">
          <li className="job__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="job__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="job__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        <button
          className="button button__1"
          value={100}
          onClick={this.props.handleClick}
        >
          Job1
        </button>
        <button
          className="button button__2"
          value={200}
          onClick={this.props.handleClick}
        >
          Job2
        </button>
        <button
          className="button button__3"
          value={300}
          onClick={this.props.handleClick}
        >
          Job3
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
