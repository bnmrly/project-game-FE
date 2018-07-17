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
          <button onClick={this.props.NightIn}>Free</button>
        </div>
        <div className="button__2">
          <p>Online Shopping</p>
          {dataChoiceEvents.onlineShopping.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              value={dataChoiceEvents.onlineShopping.initialPrice}
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={JSON.stringify(dataChoiceEvents.onlineShopping.initialPrice)}
            onClick={this.props.payByCash}
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
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={dataChoiceEvents.eatOut.initialPrice}
            onClick={this.props.payByCash}
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
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={dataChoiceEvents.movies.initialPrice}
            onClick={this.props.payByCash}
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
    NightIn: e => {
      dispatch(increaseTurnCount());
    },
    payByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
    },
    payByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
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
