import React, { Component } from 'react';
import './Tonight.css';
import { connect } from 'react-redux';
import { dataChoiceEvents } from '../../data/gameplay.json';
import store from '../../redux/index';
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import { getDecision } from '../../firebase/fb';

class Tonight extends Component {
  render() {
    return (
      <section className="tonight">
        <ul className="tonight__list ul">
          <li className="tonight__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="tonight__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="tonight__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        <div className="button__1">
          <p>Night In</p>
          <button name='nightIn-free' onClick={this.props.NightIn}>Free</button>
        </div>
        <div className="button__2">
          <p>Online Shopping</p>
          {dataChoiceEvents.onlineShopping.initialPrice >
            this.props.credit.available ? (
              <div />
            ) : (
              <button
                value={dataChoiceEvents.onlineShopping.initialPrice}
                onClick={(e) => this.props.payByCredit(e.target.value, 'online-shopping-credit', 'creditSpends')}
              >
                Credit
            </button>
            )}{' '}
          <button
            value={JSON.stringify(dataChoiceEvents.onlineShopping.initialPrice)}
            onClick={(e) => this.props.payByCash(e.target.value, 'online-shopping-cash', 'cashSpends')}
          >
            Cash
          </button>
        </div>
        <div className="button__3--tonight">
          <p>Eat Out</p>
          {dataChoiceEvents.eatOut.initialPrice >
            this.props.credit.available ? (
              <div />
            ) : (
              <button
                value={dataChoiceEvents.eatOut.initialPrice}
                onClick={(e) => this.props.payByCredit(e.target.value, 'eat-out-credit', 'creditSpends')}
              >
                Credit
            </button>
            )}{' '}
          <button
            value={dataChoiceEvents.eatOut.initialPrice}
            onClick={(e) => this.props.payByCash(e.target.value, 'eat-out-cash', 'cashSpends')}
          >
            Cash
          </button>
        </div>
        <div className="button__4--tonight">
          <p>Movies</p>
          {dataChoiceEvents.movies.initialPrice >
            this.props.credit.available ? (
              <div />
            ) : (
              <button
                value={dataChoiceEvents.movies.initialPrice}
                onClick={(e) => this.props.payByCredit(e.target.value, 'movies-credit', 'creditSpends')}
              >
                Credit
            </button>
            )}{' '}
          <button
            value={dataChoiceEvents.movies.initialPrice}
            onClick={(e) => this.props.payByCash(e.target.value, 'movies-cash', 'cashSpends')}
          >
            Cash
          </button>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    NightIn: (value, decision, paymentType) => {
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType)
    },
    payByCash: (value, decision, paymentType) => {
      dispatch(cashChange(value));
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType)
    },
    payByCredit: (value, decision, paymentType) => {
      dispatch(changeAvailableCredit(value));
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType)
    }
  };
};
const mapStateToProps = store => {
  return {
    credit: store.playerFinancialInfo.wallet.credit
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tonight);
