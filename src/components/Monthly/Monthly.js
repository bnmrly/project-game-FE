import React, { Component } from 'react';
import './Monthly.css';
import { connect } from 'react-redux';
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import shortId from 'short-id';
import { randomEvents } from '../../data/gameplay.json';
import data from '../../data/gameplay.json';
import { resetTurnCount } from '../../redux/actions/PlayerInfoAction';

class Monthly extends Component {
  state = {
    groceriesDisabled: false,
    miscellaneousDisabled: false,
    travelDisabled: false,
    phoneDisabled: false,
    wageDisabled: false,
    creditCardDisabled: false,
    randomDisabled: false,
    randomEvent: {},
    creditOwed:
      this.props.financialInfo.wallet.credit.max -
      this.props.financialInfo.wallet.credit.available
  };
  render() {
    const financialInfo = this.props.financialInfo;
    return (
      <section className="monthly">
        <div className="container__wage">
          Wage: £{financialInfo.wage}
          <button
            className="button__monthly"
            value={-financialInfo.wage}
            onClick={e => {
              this.props.payByCash(e);
              this.setState({ wageDisabled: true });
            }}
            disabled={this.state.wageDisabled}
          >
            collect wage
          </button>
        </div>
        <div className="container__card">
          <p className="p__monthly ">
            Credit Card: £
            {this.state.creditOwed}
          </p>

          <button
            className="button__monthly"
            value={-this.state.creditOwed}
            onClick={e => {
              this.setState({ creditCardDisabled: true });
              this.props.payByCredit(e);
            }}
            disabled={this.state.creditCardDisabled}
          >
            Pay Full Amount
          </button>
          <button
            className="button__monthly"
            onClick={() => {
              this.setState({ creditCardDisabled: true });
            }}
            disabled={this.state.creditCardDisabled}
          >
            Pay Interest
          </button>
          <button
            className="button__monthly"
            value={Math.floor(
              ((this.state.creditOwed / 100) *
                this.props.financialInfo.wallet.APR) /
                12
            )}
            onClick={e => {
              this.props.payByCredit(e);
              console.log('hi');
              this.setState({ creditCardDisabled: true });
            }}
            disabled={this.state.creditCardDisabled}
          >
            Don't Pay This Month
          </button>
        </div>
        <div className="container__costs">
          <p className="p__costs">Living Costs</p>

          {Object.keys(financialInfo.living_costs).map(key => {
            return (
              <p className="p__monthly" key={shortId.generate()}>
                {key}: £{financialInfo.living_costs[key]}
                <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCredit(e);
                    this.setState({ [`${key}Disabled`]: true });
                  }}
                >
                  Credit
                </button>
                <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCash(e);
                    this.setState({ [`${key}Disabled`]: true });
                  }}
                >
                  Cash
                </button>
              </p>
            );
          })}
        </div>
        <div className="container__random">
          Random Event
          <button
            className="button__monthly"
            disabled={this.state.randomDisabled}
            onClick={() => this.randomEventHandler(randomEvents)}
          >
            Risk a random Event
          </button>
          <div>{this.state.randomEvent.text} </div>
        </div>
        <div />
      </section>
    );
  }
  randomEventHandler = randomEvents => {
    const newRandomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];
    this.props.randomCashChanger(newRandomEvent.value);
    this.setState({ randomDisabled: true, randomEvent: newRandomEvent });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    payByCash: e => {
      dispatch(cashChange(e.target.value));
    },
    payByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
    },
    randomCashChanger: value => {
      dispatch(cashChange(value));
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
)(Monthly);
