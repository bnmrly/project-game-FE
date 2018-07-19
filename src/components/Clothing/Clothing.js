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
          <React.Fragment>
            <p className="grid__2 grid__row1 p__clothing">Empty pockets!</p>
            <button
              className="button__4 grid__2 grid__row2"
              name="none-free"
              onClick={this.props.continueWithStory}
            >
              No Spending Today
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
                <p className="grid__1 grid__row1 p__clothing">
                  Party clothing suit
                </p>
                <div className="grid__1 grid__row2">
                  {dataChoiceEvents.partyClothesSuit.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"    
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
                      className="button__1"
                      value={dataChoiceEvents.partyClothesSuit.initialPrice}
                      onClick={(e) => this.props.payForClothingByCash(e.target.value, 'party-clothing-cash', 'cashSpends')}
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
                  <p className="grid__2 grid__row1 p__clothing">
                    Smart casual clothing
                  </p>
                  <div className="grid__2 grid__row2">
                    {dataChoiceEvents.smartCasual.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__2"
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
                        className="button__2"
                        value={dataChoiceEvents.smartCasual.initialPrice}
                        onClick={(e) => this.props.payForClothingByCash(e.target.value, 'smart-clothing-cash', 'cashSpends')}
                      >
                        Cash
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>

            <React.Fragment>
              {dataChoiceEvents.casualClothes.initialPrice >
                this.props.credit.available &&
              dataChoiceEvents.casualClothes.initialPrice > this.props.cash ? (
                <div />
              ) : (
                <React.Fragment>
                  <p className="grid__3 grid__row1 p__clothing">
                    Casual clothing
                  </p>
                  <div className="grid__3 grid__row2">
                    {dataChoiceEvents.casualClothes.initialPrice >
                    this.props.credit.available ? (
                      <div />
                    ) : (
                      <button
                        className="button__3"
                        name="casualCloting-credit"
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
                        className="button__3"
                        value={dataChoiceEvents.casualClothes.initialPrice}
                        onClick={(e) => this.props.payForClothingByCash(e.target.value, 'casual-clothing-cash', 'cashSpends')}
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
