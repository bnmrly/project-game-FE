import React, { Component } from 'react';
import './Clothing.css';
import { connect } from 'react-redux';
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import { dataChoiceEvents } from '../../data/gameplay.json';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { getDecision } from '../../firebase/fb';;

class Clothing extends Component {
  render() {
    return (
      <section className="clothing">
        <ul className="clothing__list ul">
          <li className="clothing__list-item">
            Job 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="clothing__list-item">
            Job 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="clothing__list-item">
            Job 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
        {dataChoiceEvents.partyClothesSuit.initialPrice >
          this.props.credit.available &&
          dataChoiceEvents.partyClothesSuit.initialPrice > this.props.cash &&
          dataChoiceEvents.smartCasual.initialPrice >
          this.props.credit.available &&
          dataChoiceEvents.smartCasual.initialPrice > this.props.cash &&
          dataChoiceEvents.casualClothes.initialPrice >
          this.props.credit.available &&
          dataChoiceEvents.casualClothes.initialPrice > this.props.cash ? (
            <div>
              <button name='currentClothing-free' onClick={this.props.continueWithStory}>
                Proceed with current clothing
            </button>
            </div>
          ) : (
            <div className="container__button">
              {dataChoiceEvents.partyClothesSuit.initialPrice >
                this.props.credit.available &&
                dataChoiceEvents.partyClothesSuit.initialPrice > this.props.cash ? (
                  <div />
                ) : (
                  <div className="button__1">
                    <p>Party clothing suit</p>
                    <div>
                      {dataChoiceEvents.partyClothesSuit.initialPrice >
                        this.props.credit.available ? (
                          <div />
                        ) : (
                          <button
                            value={dataChoiceEvents.partyClothesSuit.initialPrice}
                            onClick={(e) => this.props.payForClothingByCredit(e.target.value, 'party-clothing-credit', 'creditSpends')}
                          >
                            Credit

                    </button>
                        )}{' '}
                      {dataChoiceEvents.partyClothesSuit.initialPrice >
                        this.props.cash ? (
                          <div />
                        ) : (
                          <button
                            value={dataChoiceEvents.partyClothesSuit.initialPrice}
                            onClick={(e) => this.props.payForClothingByCash(e.target.value, 'party-clothing-cash', 'cashSpends')}
                          >
                            Cash
                    </button>
                        )}
                    </div>
                  </div>
                )}
              <div className="button__2">
                {dataChoiceEvents.smartCasual.initialPrice > this.props.cash &&
                  dataChoiceEvents.smartCasual.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <div>
                      <p>Smart casual clothing</p>
                      <div>
                        {dataChoiceEvents.smartCasual.initialPrice >
                          this.props.credit.available ? (
                            <div />
                          ) : (
                            <button
                              value={dataChoiceEvents.smartCasual.initialPrice}
                              onClick={(e) => this.props.payForClothingByCredit(e.target.value, 'smart-clothing-credit', 'creditSpends')}
                            >
                              Credit
                      </button>
                          )}{' '}
                        {dataChoiceEvents.smartCasual.initialPrice >
                          this.props.cash ? (
                            <div />
                          ) : (
                            <button
                              value={dataChoiceEvents.smartCasual.initialPrice}
                              onClick={(e) => this.props.payForClothingByCash(e.target.value, 'smart-clothing-cash', 'cashSpends')}
                            >
                              Cash
                      </button>
                          )}
                      </div>
                    </div>
                  )}
              </div>
              <div className="button__3">
                {dataChoiceEvents.casualClothes.initialPrice >
                  this.props.credit.available &&
                  dataChoiceEvents.casualClothes.initialPrice > this.props.cash ? (
                    <div />
                  ) : (
                    <div>
                      <p>Casual clothing</p>
                      <div>
                        {dataChoiceEvents.casualClothes.initialPrice >
                          this.props.credit.available ? (
                            <div />
                          ) : (
                            <button
                              value={dataChoiceEvents.casualClothes.initialPrice}
                              onClick={(e) => this.props.payForClothingByCredit(e.target.value, 'casual-clothing-credit', 'creditSpends')}
                            >
                              Credit

                      </button>
                          )}{' '}
                        {dataChoiceEvents.casualClothes.initialPrice >
                          this.props.cash ? (
                            <div />
                          ) : (
                            <button
                              value={dataChoiceEvents.casualClothes.initialPrice}
                              onClick={(e) => this.props.payForClothingByCash(e.target.value, 'casual-clothing-cash', 'cashSpends')}
                            >
                              Cash
                      </button>
                          )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    continueWithStory: (value, decision, paymentType) => {
      dispatch(increaseTurnCount());
      getDecision('clothingDecision', decision, paymentType)
    },
    payForClothingByCash: (value, decision, paymentType) => {
      dispatch(cashChange(value));
      dispatch(increaseTurnCount());
      getDecision('clothingDecision', decision, paymentType)
    },
    payForClothingByCredit: (value, decision, paymentType) => {
      dispatch(changeAvailableCredit(value));
      dispatch(increaseTurnCount());
      getDecision('clothingDecision', decision, paymentType)
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
)(Clothing);
