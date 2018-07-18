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
        <React.Fragment>
          <p className="grid__1 grid__row1">Night In</p>
          <button
            className="button__1 grid__1 grid__row2"
            name="nightIn-free"
            onClick={this.props.NightIn}
          >
            Free
          </button>
        </React.Fragment>
        <React.Fragment>
          <p className="grid__2 grid__row1">Online Shopping</p>
          {dataChoiceEvents.onlineShopping.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              className="button__2 grid__2 grid__row2"
              name="onlineShopping-credit"
              value={dataChoiceEvents.onlineShopping.initialPrice}
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            className="button__2 grid__2 grid__row2"
            name="onlineShopping-cash"
            value={JSON.stringify(dataChoiceEvents.onlineShopping.initialPrice)}
            onClick={this.props.payByCash}
          >
            Cash
          </button>
        </React.Fragment>
        <React.Fragment>
          <p className="grid__1 grid__row3">Eat Out</p>
          {dataChoiceEvents.eatOut.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              className="button__3 grid__1 grid__row4"
              name="eatOut-credit"
              value={dataChoiceEvents.eatOut.initialPrice}
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            className="button__3 grid__1 grid__row4"
            name="eatOut-cash"
            value={dataChoiceEvents.eatOut.initialPrice}
            onClick={this.props.payByCash}
          >
            Cash
          </button>
        </React.Fragment>
        <React.Fragment>
          <p className="grid__2 grid__row3">Movies</p>
          {dataChoiceEvents.movies.initialPrice >
          this.props.credit.available ? (
            <div />
          ) : (
            <button
              className="button__4 grid__2 grid__row4"
              name="movies-credit"
              value={dataChoiceEvents.movies.initialPrice}
              onClick={this.props.payByCredit}
            >
              Credit
            </button>
          )}{' '}
          <button
            className="button__4 grid__2 grid__row4"
            name="movies-cash"
            value={dataChoiceEvents.movies.initialPrice}
            onClick={this.props.payByCash}
          >
            Cash
          </button>
        </React.Fragment>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    NightIn: e => {
      dispatch(increaseTurnCount());
      getDecision('night', e.target.name);
    },
    payByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('night', e.target.name);
    },
    payByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('night', e.target.name);
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
