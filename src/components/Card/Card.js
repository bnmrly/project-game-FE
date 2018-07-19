import React, { Component } from 'react';
import './Card.css';
import { connect } from 'react-redux';
import {
  cardSelectionEvent,
  increaseTurnCount,
  changeCredit
} from '../../redux/actions/PlayerInfoAction';
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
          className="button button__1 grid__1"
          value="LOW"
          onClick={(e) => this.props.handleClick(e.target.value, 'low')}
        >
          Low
        </button>
        <button
          className="button button__2 grid__2"
          value="MEDIUM"
          onClick={(e) => this.props.handleClick(e.target.value, 'med')}
        >
          Medium
        </button>
        <button
          className="button button__3 grid__3"
          value="HIGH"
          onClick={(e) => this.props.handleClick(e.target.value, 'high')}
        >
          High
        </button>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: (value, decision) => {
      getDecision('cardDecision', decision);
      dispatch(cardSelectionEvent(value));
      dispatch(increaseTurnCount());
      dispatch(changeCredit({ available: 500, max: 500 }))
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
