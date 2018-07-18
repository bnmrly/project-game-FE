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
          {dataChoiceEvents.onlineShopping.initialPrice >
            this.props.credit.available &&
          dataChoiceEvents.onlineShopping.initialPrice > this.props.cash ? (
            <div />
          ) : (
            <React.Fragment>
              <p className="grid__1 grid__row1">Online Shopping</p>
              <div className="grid__1 grid__row2">
                {dataChoiceEvents.onlineShopping.initialPrice >
                this.props.credit.available ? (
                  <div />
                ) : (
                  <button
                    className="button__1"
                    name="onlineShopping-credit"
                    value={dataChoiceEvents.onlineShopping.initialPrice}
                    onClick={this.props.payByCredit}
                  >
                    Credit
                  </button>
                )}{' '}
                {dataChoiceEvents.partyClothesSuit.initialPrice >
                this.props.cash ? (
                  <div />
                ) : (
                  <button
                    className="button__1"
                    name="onlineShopping-cash"
                    value={JSON.stringify(
                      dataChoiceEvents.onlineShopping.initialPrice
                    )}
                    onClick={this.props.payByCash}
                  >
                    Cash
                  </button>
                )}
              </div>
            </React.Fragment>
          )}
          <React.Fragment>
            {dataChoiceEvents.smartCasual.initialPrice > this.props.cash &&
            dataChoiceEvents.smartCasual.initialPrice >
              this.props.credit.available ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__2 grid__row1">Eat Out</p>
                <div className="grid__2 grid__row2">
                  {dataChoiceEvents.eatOut.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__2"
                      name="eatOut-credit"
                      value={dataChoiceEvents.eatOut.initialPrice}
                      onClick={this.props.payByCredit}
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.eatOut.initialPrice > this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__2"
                      name="eatOut-cash"
                      value={dataChoiceEvents.eatOut.initialPrice}
                      onClick={this.props.payByCash}
                    >
                      Cash
                    </button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>

          <React.Fragment>
            {dataChoiceEvents.movies.initialPrice >
              this.props.credit.available &&
            dataChoiceEvents.movies.initialPrice > this.props.cash ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__1 grid__row3">Movies</p>
                <div className="grid__1 grid__row4">
                  {dataChoiceEvents.movies.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__3"
                      name="movies-credit"
                      value={dataChoiceEvents.movies.initialPrice}
                      onClick={this.props.payByCredit}
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.movies.initialPrice > this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__3"
                      name="movies-cash"
                      value={dataChoiceEvents.movies.initialPrice}
                      onClick={this.props.payByCash}
                    >
                      Cash
                    </button>
                  )}
                </div>
                <React.Fragment>
                  <p className="grid__2 grid__row3">Night In</p>
                  <div className="grid__2 grid__row4">
                    <button
                      className="button__4"
                      name="nightIn-free"
                      onClick={this.props.NightIn}
                    >
                      Free
                    </button>
                  </div>
                </React.Fragment>
              </React.Fragment>
            )}
          </React.Fragment>
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
