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
    console.log(this.props);
    return (
      <section className="phone">
        <ul className="phone__list ul">
          <li className="phone__list-item">
            Contract Phone: Low up-front cost, but £30 a month to get the newest
            phone on the market
          </li>
          <li className="phone__list-item">
            Sim Only Phone: A big hit up-front cost, but only £10 a month for
            all the calls, texts and data you could need
          </li>
          <li className="phone__list-item">
            Second Hand Phone: Cheap as chips! Low up-front cost and only £10 a
            month
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
                  Contract Phone
                </p>
                <div className="grid__1 grid__row2">
                  {dataChoiceEvents.phoneContractHigh.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
                      onClick={e =>
                        this.props.payForPhoneByCredit(
                          e.target.value,
                          'highContract',
                          'creditSpends'
                        )
                      }
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
                      value={JSON.stringify(dataChoiceEvents.phoneContractHigh)}
                      onClick={e =>
                        this.props.payForPhoneByCash(
                          e.target.value,
                          'highContract',
                          'cashSpends'
                        )
                      }
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
                    Sim Only Phone
                  </p>
                  <div className="grid__2 grid__row2">
                    {dataChoiceEvents.phoneSimOnly.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
                        value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
                        onClick={e =>
                          this.props.payForPhoneByCredit(
                            e.target.value,
                            'simOnly',
                            'creditSpends'
                          )
                        }
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
                        value={JSON.stringify(dataChoiceEvents.phoneSimOnly)}
                        onClick={e =>
                          this.props.payForPhoneByCash(
                            e.target.value,
                            'simOnly',
                            'cashSpends'
                          )
                        }
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
                    Second Hand Phone
                  </p>
                  <div className="grid__3 grid__row2">
                    {dataChoiceEvents.phoneSecondHand.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__3"
                        value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
                        onClick={e =>
                          this.props.payForPhoneByCredit(
                            e.target.value,
                            'secondHand',
                            'creditSpends'
                          )
                        }
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
                        value={JSON.stringify(dataChoiceEvents.phoneSecondHand)}
                        onClick={e =>
                          this.props.payForPhoneByCash(
                            e.target.value,
                            'secondHand',
                            'cashSpends'
                          )
                        }
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
    },
    payForPhoneByCash: (value, decision, paymentType) => {
      const contractInfo = JSON.parse(value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      getDecision('phoneDecision', decision, paymentType);
      dispatch(cashChange(contractInfo.initialPrice));
      dispatch(addToMonthlyCosts(phoneMonthly));
      dispatch(increaseTurnCount());
    },
    payForPhoneByCredit: (value, decision, paymentType) => {
      const contractInfo = JSON.parse(value);
      const phoneMonthly = { key: 'phone', value: contractInfo.monthlyCost };
      getDecision('phoneDecision', decision, paymentType);
      dispatch(changeAvailableCredit(contractInfo.initialPrice));
      dispatch(addToMonthlyCosts(phoneMonthly));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    credit: store.playerFinancialInfo.wallet.credit,
    cash: store.playerFinancialInfo.wallet.cash
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phone);
