import React, { Component } from 'react';
import './Card.css';
import { connect } from 'react-redux';
import {
  cardSelectionEvent,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import { getDecision } from '../../firebase/fb';

class Card extends Component {
  render() {
    return (
      <section className="card">
        <ul className="card__list ul">
          <li className="card__list-item">
            Low APR: You have a £200 credit limit: for every £1 you spend, you
            pay back £1.10
          </li>
          <li className="card__list-item">
            Medium APR: You have a £400 credit limit: for every £1 you spend,
            you pay back £1.20
          </li>
          <li className="card__list-item">
            High APR: You have a £600 credit limit: for every £1 you spend, you
            pay back £1.30
          </li>
        </ul>
        <button
          className="button button__1 grid__1"
          value="LOW"
          onClick={e => this.props.handleClick(e.target.value, 'low')}
        >
          Low
        </button>
        <button
          className="button button__2 grid__2"
          value="MEDIUM"
          onClick={e => this.props.handleClick(e.target.value, 'med')}
        >
          Medium
        </button>
        <button
          className="button button__3 grid__3"
          value="HIGH"
          onClick={e => this.props.handleClick(e.target.value, 'high')}
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
      getDecision('card', decision);
      dispatch(cardSelectionEvent(value));
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
