import React, { Component } from 'react';
import './Phone.css';
import { connect } from 'react-redux';
import { dataChoiceEvents } from '../../data/gameplay.json';
import store from '../../redux/index';
import {
  cashChange,
  changeAvailableCredit,
  addToMonthlyCosts,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
class Phone extends Component {
  render() {
    return (
      <section className="phone">
        <ul className="phone__list ul">
          <li className="phone__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="phone__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="phone__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        <div className="button__1">
          <p>High contract phone deal</p>
          {dataChoiceEvents.phoneContractHigh.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
              onClick={this.props.payForPhoneByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
            onClick={this.props.payForPhoneByCash}
          >
            Cash
          </button>
        </div>
        <div className="button__2">
          <p>Sim only phone deal</p>
          {dataChoiceEvents.phoneSimOnly.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
              onClick={this.props.payForPhoneByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
            onClick={this.props.payForPhoneByCash}
          >
            Cash
          </button>
        </div>
        <div className="button__3">
          <p>Second hand phone deal</p>
          {dataChoiceEvents.phoneSecondHand.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
              onClick={this.props.payForPhoneByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
            onClick={this.props.payForPhoneByCash}
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
    payForPhoneByCash: e => {
      const contractInfo = JSON.parse(e.target.value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      dispatch(cashChange(contractInfo.initialPrice));
      dispatch(addToMonthlyCosts(phoneMonthly));
      dispatch(increaseTurnCount());
    },
    payForPhoneByCredit: e => {
      const contractInfo = JSON.parse(e.target.value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      dispatch(changeAvailableCredit(contractInfo.initialPrice));
      dispatch(addToMonthlyCosts(phoneMonthly));
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
)(Phone);
