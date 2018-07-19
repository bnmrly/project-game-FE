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
    // "NightIn": {
    //   "initialPrice": null
    // },
    // "onlineShopping": {
    //   "initialPrice": 40
    // },
    // "eatOut": {
    //   "initialPrice": 60
    // },
    // "movies": {
    //   "initialPrice": 20
    // },

    return (
      <section className="tonight">
        <ul className="tonight__list ul">
          <li className="tonight__list-item">
            Online Shopping: Treat yourself, you know you want to
          </li>
          <li className="tonight__list-item">
            Eat Out: Get some friends together and go out for a delicious meal
          </li>
          <li className="tonight__list-item">
            Cinema: Get some popcorn and enjoy yourself
          </li>
          <li className="tonight__list-item">
            Night In: Put your feet up and relax at home
          </li>
        </ul>
        <React.Fragment>
          {dataChoiceEvents.onlineShopping.initialPrice >
            this.props.credit.available &&
          dataChoiceEvents.onlineShopping.initialPrice > this.props.cash ? (
            <div />
          ) : (
            <React.Fragment>
              <p className="grid__1 grid__row1 p__tonight">Online Shopping</p>
              <div className="grid__1 grid__row2">
                {dataChoiceEvents.onlineShopping.initialPrice >
                this.props.credit.available ? (
                  <div />
                ) : (
                  <button
                    className="button__1"
                    name="onlineShopping-credit"
                    value={dataChoiceEvents.onlineShopping.initialPrice}
                    onClick={e =>
                      this.props.payByCredit(
                        e.target.value,
                        'onlineShopping',
                        'creditSpends'
                      )
                    }
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
                    onClick={e =>
                      this.props.payByCash(
                        e.target.value,
                        'onlineShopping',
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
            {dataChoiceEvents.smartCasual.initialPrice > this.props.cash &&
            dataChoiceEvents.smartCasual.initialPrice >
              this.props.credit.available ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__2 grid__row1 p__tonight">Eat Out</p>
                <div className="grid__2 grid__row2">
                  {dataChoiceEvents.eatOut.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__2"
                      value={dataChoiceEvents.eatOut.initialPrice}
                      onClick={e =>
                        this.props.payByCredit(
                          e.target.value,
                          'eatOut',
                          'creditSpends'
                        )
                      }
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.eatOut.initialPrice > this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__2"
                      value={dataChoiceEvents.eatOut.initialPrice}
                      onClick={e =>
                        this.props.payByCash(
                          e.target.value,
                          'eatOut',
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
            {dataChoiceEvents.movies.initialPrice >
              this.props.credit.available &&
            dataChoiceEvents.movies.initialPrice > this.props.cash ? (
              <div />
            ) : (
              <React.Fragment>
                <p className="grid__1 grid__row3 p__tonight">Cinema</p>
                <div className="grid__1 grid__row4">
                  {dataChoiceEvents.movies.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__3"
                      value={dataChoiceEvents.movies.initialPrice}
                      onClick={e =>
                        this.props.payByCredit(
                          e.target.value,
                          'movies',
                          'creditSpends'
                        )
                      }
                    >
                      Credit
                    </button>
                  )}{' '}
                  {dataChoiceEvents.movies.initialPrice > this.props.cash ? (
                    <div />
                  ) : (
                    <button
                      className="button__3"
                      value={dataChoiceEvents.movies.initialPrice}
                      onClick={e =>
                        this.props.payByCash(
                          e.target.value,
                          'movies',
                          'cashSpends'
                        )
                      }
                    >
                      Cash
                    </button>
                  )}
                </div>
                <React.Fragment>
                  <p className="grid__2 grid__row3 p__tonight">Night In</p>
                  <div className="grid__2 grid__row4">
                    <button
                      className="button__4"
                      onClick={e =>
                        this.props.NightIn(e.target.value, 'nightIn')
                      }
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
    NightIn: (value, decision, paymentType) => {
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType);
    },
    payByCash: (value, decision, paymentType) => {
      dispatch(cashChange(value));
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType);
    },
    payByCredit: (value, decision, paymentType) => {
      dispatch(changeAvailableCredit(value));
      dispatch(increaseTurnCount());
      getDecision('nightDecision', decision, paymentType);
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
)(Tonight);
