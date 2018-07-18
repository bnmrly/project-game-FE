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
import { getDecision } from '../../firebase/fb';

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
        {dataChoiceEvents.phoneContractHigh.initialPrice >
          this.props.credit.available &&
        dataChoiceEvents.phoneContractHigh.initialPrice > this.props.cash &&
        dataChoiceEvents.phoneSimOnly.initialPrice >
          this.props.credit.available &&
        dataChoiceEvents.phoneSimOnly.initialPrice > this.props.cash &&
        dataChoiceEvents.phoneSecondHand.initialPrice >
          this.props.credit.available &&
        dataChoiceEvents.phoneSecondHand.initialPrice > this.props.cash ? (
          <div>
            <p className="grid__2 grid__row1">Empty pockets!</p>
            <button
              className="button__4 grid__2 grid__row2"
              name="old-phone"
              onClick={this.props.continueWithStory}
            >
              No Spending Today
            </button>
          </div>
        ) : (
          <React.Fragment>
            {dataChoiceEvents.phoneContractHigh.initialPrice >
              this.props.credit.available &&
            dataChoiceEvents.phoneContractHigh.initialPrice >
              this.props.cash ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__1 grid__row1 grid__row1-phone">
                  Contract phone
                </p>
                <div className="grid__1 grid__row2">
                  {dataChoiceEvents.phoneContractHigh.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      name="highContract-credit"
                      value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
                      onClick={this.props.payForPhoneByCredit}
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.phoneContractHigh.initialPrice >
                  this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      name="highContract-cash"
                      value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
                      onClick={this.props.payForPhoneByCash}
                    >
                      Cash
                    </button>
                  )}
                </div>
              </React.Fragment>
            )}
            <React.Fragment>
              {dataChoiceEvents.phoneSimOnly.initialPrice > this.props.cash &&
              dataChoiceEvents.phoneSimOnly.initialPrice >
                this.props.credit.available ? (
                <div />
              ) : (
                <React.Fragment>
                  <p className="grid__2 grid__row1 grid__row1-phone">
                    Sim only phone
                  </p>
                  <div className="grid__2 grid__row2">
                    {dataChoiceEvents.phoneSimOnly.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
                        name="simOnly-credit"
                        value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
                        onClick={this.props.payForPhoneByCredit}
                      >
                        Credit
                      </button>
                    )}{' '}
                    {dataChoiceEvents.phoneSimOnly.initialPrice >
                    this.props.cash ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
                        name="simOnly-cash"
                        value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
                        onClick={this.props.payForPhoneByCash}
                      >
                        Cash
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
            <React.Fragment>
              {dataChoiceEvents.phoneSecondHand.initialPrice >
                this.props.credit.available &&
              dataChoiceEvents.phoneSecondHand.initialPrice >
                this.props.cash ? (
                <div />
              ) : (
                <React.Fragment>
                  <p className="grid__3 grid__row1 grid__row1-phone">
                    Second hand phone
                  </p>
                  <div className="grid__3 grid__row2">
                    {dataChoiceEvents.phoneSecondHand.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__3"
                        name="secondHand-credit"
                        value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
                        onClick={this.props.payForPhoneByCredit}
                      >
                        Credit
                      </button>
                    )}{' '}
                    {dataChoiceEvents.phoneSecondHand.initialPrice >
                    this.props.cash ? (
                      <div />
                    ) : (
                      <button
                        className="button__3"
                        name="secondHand-cash"
                        value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
                        onClick={this.props.payForPhoneByCash}
                      >
                        Cash
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </React.Fragment>
        )}
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    continueWithStory: e => {
      dispatch(increaseTurnCount());
      getDecision('phone', e.target.name);
    },
    payForPhoneByCash: e => {
      const contractInfo = JSON.parse(e.target.value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      getDecision('phone', e.target.name);
      dispatch(cashChange(contractInfo.initialPrice));
      dispatch(addToMonthlyCosts(phoneMonthly));
      dispatch(increaseTurnCount());
    },
    payForPhoneByCredit: e => {
      const contractInfo = JSON.parse(e.target.value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      getDecision('phone', e.target.name);
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
