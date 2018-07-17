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
import { getDecision } from '../../firebase/fb';

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
            <button
              name="currentClothing-free"
              onClick={this.props.continueWithStory}
            >
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
              <div className="grid__1">
                <p>Party clothing suit</p>
                <div>
                  {dataChoiceEvents.partyClothesSuit.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
                      className="button__1"
                      name="partyClothing-credit"
                      value={dataChoiceEvents.partyClothesSuit.initialPrice}
                      onClick={this.props.payForClothingByCredit}
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
                      name="partyClothing-cash"
                      value={dataChoiceEvents.partyClothesSuit.initialPrice}
                      onClick={this.props.payForClothingByCash}
                    >
                      Cash
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="grid__2">
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
                        className="button__2"
                        name="smartCasual-credit"
                        value={dataChoiceEvents.smartCasual.initialPrice}
                        onClick={this.props.payForClothingByCredit}
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
                        name="smartCasual-cash"
                        value={dataChoiceEvents.smartCasual.initialPrice}
                        onClick={this.props.payForClothingByCash}
                      >
                        Cash
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="grid__3">
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
                        className="button__3"
                        name="casualCloting-credit"
                        value={dataChoiceEvents.casualClothes.initialPrice}
                        onClick={this.props.payForClothingByCredit}
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
                        name="casualCloting-cash"
                        value={dataChoiceEvents.casualClothes.initialPrice}
                        onClick={this.props.payForClothingByCash}
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
    continueWithStory: e => {
      dispatch(increaseTurnCount());
      getDecision('clothing', e.target.name);
    },
    payForClothingByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('clothing', e.target.name);
    },
    payForClothingByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
      getDecision('clothing', e.target.name);
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
