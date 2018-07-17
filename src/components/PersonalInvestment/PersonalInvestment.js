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
class PersonalInvestment extends Component {
  render() {
    console.log(this.props.wage);
    return (
      <section>
        <div>
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
              onClick={this.props.payForCourseByCredit}
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
              onClick={this.props.payForCourseByCash}
            >
              Cash
            </button>
          )}
        </div>
        <div>
          <p>Holiday</p>
          {dataChoiceEvents.holiday.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              value={dataChoiceEvents.holiday.initialPrice}
              onClick={this.props.payForHolidayByCredit}
            >
              Credit
            </button>
          )}{' '}
          {dataChoiceEvents.holiday.initialPrice > this.props.cash ? (
            <div />
          ) : (
            <button
              value={dataChoiceEvents.holiday.initialPrice}
              onClick={this.props.payForHolidayByCash}
            >
              Cash
            </button>
          )}{' '}
        </div>
        {dataChoiceEvents.careerProgression.initialPrice > this.props.cash &&
        dataChoiceEvents.careerProgression.initialPrice >
          this.props.credit.available ? (
          <div>
            <p>Can't afford either</p>
            <button onClick={this.props.payForHolidayByCash}>
              No Spending Today
            </button>
          </div>
        ) : (
          ''
        )}
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    payForHolidayByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
    },
    payForHolidayByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
    },
    payForCourseByCash: e => {
      const courseData = JSON.parse(e.target.value);
      dispatch(cashChange(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
    },
    payForCourseByCredit: e => {
      const courseData = JSON.parse(e.target.value);
      dispatch(changeAvailableCredit(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
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
