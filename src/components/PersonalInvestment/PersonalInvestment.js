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
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="investment__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="investment__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              name="none-free"
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
                      name="course-credit"
                      value={JSON.stringify({
                        ...dataChoiceEvents.careerProgression,
                        wage: this.props.wage
                      })}
                      onClick={this.props.payForCourseByCredit}
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
                      name="course-cash"
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
                        name="holiday-credit"
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
                        className="button__2"
                        name="holiday-cash"
                        value={dataChoiceEvents.holiday.initialPrice}
                        onClick={this.props.payForHolidayByCash}
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
    payForHolidayByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('careerProgression', e.target.name);
    },
    payForHolidayByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('careerProgression', e.target.name);
    },
    payForCourseByCash: e => {
      const courseData = JSON.parse(e.target.value);
      dispatch(cashChange(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
      getDecision('careerProgression', e.target.name);
    },
    payForCourseByCredit: e => {
      const courseData = JSON.parse(e.target.value);
      dispatch(changeAvailableCredit(courseData.initialPrice));
      dispatch(increaseTurnCount());
      dispatch(setUserWage(courseData.wageIncrease + courseData.wage));
      getDecision('careerProgression', e.target.name);
    },
    cantAfford: e => {
      dispatch(increaseTurnCount());
      getDecision('careerProgression', e.target.name);
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
