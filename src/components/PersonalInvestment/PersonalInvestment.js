import React, { Component } from 'react';
import './PersonalInvestment.css';
import { connect } from 'react-redux';
import { dataChoiceEvents } from '../../data/gameplay.json';
import store from '../../redux/index';
import {
  cashChange,
  changeAvailableCredit,
  setUserWage,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import { getDecision } from '../../firebase/fb';
import { get } from 'https';

class PersonalInvestment extends Component {
  render() {
    return (
      <section className="investment">
        <ul className="investment__list ul">
          <li className="investment__list-item">
            Career Progression: Invest in your future!
          </li>
          <li className="investment__list-item">
            Hoiday with friends: Have fun in the sun!
          </li>
        </ul>
        {dataChoiceEvents.careerProgression.initialPrice >
          this.props.credit.available &&
        dataChoiceEvents.careerProgression.initialPrice > this.props.cash &&
        dataChoiceEvents.smartCasual.initialPrice >
          this.props.credit.available &&
        dataChoiceEvents.smartCasual.initialPrice > this.props.cash ? (
          <React.Fragment>
            <p className="grid__4 grid__row1">Empty pockets!</p>
            <button
              className="button__4 grid__4 grid__row2"
              onClick={this.props.cantAfford}
            >
              No money!
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {dataChoiceEvents.partyClothesSuit.initialPrice >
              this.props.credit.available &&
            dataChoiceEvents.partyClothesSuit.initialPrice > this.props.cash ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__1 grid__row1">Career Progression</p>
                <div className="grid__1 grid__row2">
                  {dataChoiceEvents.careerProgression.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      value={JSON.stringify({
                        ...dataChoiceEvents.careerProgression,
                        wage: this.props.wage
                      })}
                      onClick={e =>
                        this.props.payForCourseByCredit(
                          e.target.value,
                          'course',
                          'creditSpends'
                        )
                      }
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.careerProgression.initialPrice >
                  this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      value={JSON.stringify({
                        ...dataChoiceEvents.careerProgression,
                        wage: this.props.wage
                      })}
                      onClick={e =>
                        this.props.payForCourseByCash(
                          e.target.value,
                          'course',
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
              {dataChoiceEvents.holiday.initialPrice > this.props.cash &&
              dataChoiceEvents.holiday.initialPrice >
                this.props.credit.available ? (
                <div />
              ) : (
                <React.Fragment>
                  <p className="grid__2 grid__row1">Holiday with friends</p>
                  <div className="grid__2 grid__row2">
                    {dataChoiceEvents.holiday.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
                        value={dataChoiceEvents.holiday.initialPrice}
                        onClick={e =>
                          this.props.payForHolidayByCredit(
                            e.target.value,
                            'holiday',
                            'creditSpends'
                          )
                        }
                      >
                        Credit
                      </button>
                    )}{' '}
                    {dataChoiceEvents.holiday.initialPrice > this.props.cash ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
                        value={dataChoiceEvents.holiday.initialPrice}
                        onClick={e =>
                          this.props.payForHolidayByCash(
                            e.target.value,
                            'holiday',
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
    payForHolidayByCash: (value, decision, paymentType) => {
      dispatch(cashChange(value));
      dispatch(increaseTurnCount());
      getDecision('careerProgressionDecision', decision, paymentType);
    },
    payForHolidayByCredit: (value, decision, paymentType) => {
      dispatch(changeAvailableCredit(value));
      dispatch(increaseTurnCount());

      getDecision('careerProgressionDecision', decision, paymentType);
    },
    payForCourseByCash: (value, decision, paymentType) => {
      const courseData = JSON.parse(value);
      dispatch(cashChange(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(
        setUserWage(Number(courseData.wageIncrease) + Number(courseData.wage))
      );

      getDecision('careerProgressionDecision', decision, paymentType);
    },
    payForCourseByCredit: (value, decision, paymentType) => {
      const courseData = JSON.parse(value);
      dispatch(changeAvailableCredit(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(
        setUserWage(Number(courseData.wageIncrease) + Number(courseData.wage))
      );
      getDecision('careerProgressionDecision', decision, paymentType);
    },
    cantAfford: e => {
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    credit: store.playerFinancialInfo.wallet.credit,
    wage: store.playerFinancialInfo.wage,
    cash: store.playerFinancialInfo.wallet.cash
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInvestment);
