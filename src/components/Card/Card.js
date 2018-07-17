import React, { Component } from 'react';
import './Card.css';
import { connect } from 'react-redux';
import {
  cardSelectionEvent,
  increaseTurnCount
} from "../../redux/actions/PlayerInfoAction";
import { getDecision } from '../../firebase/fb';


class Card extends Component {
  render() {
    return (
      <section className="card">
        <ul className="card__list ul">
          <li className="card__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="card__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="card__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        <button
          name='low'
          className="button button__1"
          value="LOW"
          onClick={this.props.handleClick}
        >
          Low
        </button>
        <button
          name='med'
          className="button button__2"
          value="MEDIUM"
          onClick={this.props.handleClick}
        >
          Medium
        </button>
        <button
          name='high'
          className="button button__3"
          value="HIGH"
          onClick={this.props.handleClick}
        >
          High
        </button>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      getDecision('card', e.target.name)
      dispatch(cardSelectionEvent(e.target.value));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    wallet: store.playerFinancialInfo.wallet
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
