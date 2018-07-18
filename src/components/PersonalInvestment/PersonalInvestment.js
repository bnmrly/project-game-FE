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
    console.log(this.props.wage);
    return (
      <section className="investment">
        <ul className="investment__list ul">
          <li className="investment__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="investment__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="investment__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        <div className="button__1">
          <p>Career Progression</p>
          {dataChoiceEvents.careerProgression.initialPrice >
            this.props.credit.available ? (
              <div />
            ) : (
              <button
                value={JSON.stringify({
                  ...dataChoiceEvents.careerProgression,
                  wage: this.props.wage
                })}
                onClick={(e) => this.props.payForCourseByCredit(e.target.value, 'career-progression-credit', 'creditSpends')}
              >
                Credit
            </button>
            )}{' '}
          {dataChoiceEvents.careerProgression.initialPrice > this.props.cash ? (
            <div />
          ) : (
              <button
                value={JSON.stringify({
                  ...dataChoiceEvents.careerProgression,
                  wage: this.props.wage
                })}
                onClick={(e) => this.props.payForCourseByCash(e.target.value, 'career-progession-cash', 'cashSpends')}
              >
                Cash
            </button>
            )}
        </div>
        <div className="button__2">
          <p>Holiday with friends</p>
          {dataChoiceEvents.holiday.initialPrice >

            this.props.credit.available ? (
              <div />
            ) : (
              <button
                value={dataChoiceEvents.holiday.initialPrice}
                onClick={(e) => this.props.payForHolidayByCredit(e.target.value, 'holiday-credit', 'creditSpends')}
              >
                Credit
            </button>
            )}{' '}
          {dataChoiceEvents.holiday.initialPrice > this.props.cash ? (
            <div />
          ) : (
              <button
                value={dataChoiceEvents.holiday.initialPrice}
                onClick={(e) => this.props.payForHolidayByCash(e.target.value, 'holiday-cash', 'cashSpends')}
              >
                Cash
            </button>
            )}{' '}
        </div>
        {dataChoiceEvents.careerProgression.initialPrice >
          this.props.cash && dataChoiceEvents.careerProgression.initialPrice >
          this.props.credit.available && dataChoiceEvents.holiday.initialPrice >
          this.props.cash && dataChoiceEvents.holiday.initialPrice >
          this.props.credit.available ?
          <div className="button__3">
            <p>Can't afford either</p>
            <button
              onClick={this.props.cantAfford}>
              No Spending Today
            </button>
          </div>
          : (
            ''
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
      getDecision('careerProgressionDecision', decision, paymentType)
    },
    payForHolidayByCredit: (value, decision, paymentType) => {
      dispatch(changeAvailableCredit(value));
      dispatch(increaseTurnCount());
      getDecision('careerProgressionDecision', decision, paymentType)
    },
    payForCourseByCash: (value, decision, paymentType) => {
      const courseData = JSON.parse(value);
      dispatch(cashChange(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
      getDecision('careerProgressionDecision', decision, paymentType)
    },
    payForCourseByCredit: (value, decision, paymentType) => {
      const courseData = JSON.parse(value);
      dispatch(changeAvailableCredit(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
      getDecision('careerProgressionDecision', decision, paymentType)
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
