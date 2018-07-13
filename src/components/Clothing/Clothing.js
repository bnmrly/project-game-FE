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
class Clothing extends Component {
  render() {
    return (
      <section>
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
            <button onClick={this.props.continueWithStory}>
              Proceed with current clothing
            </button>
          </div>
        ) : (
          <div>
            {dataChoiceEvents.partyClothesSuit.initialPrice >
              this.props.credit.available &&
            dataChoiceEvents.partyClothesSuit.initialPrice > this.props.cash ? (
              <div />
            ) : (
              <div>
                <p>Party clothing suit</p>
                <div>
                  {dataChoiceEvents.partyClothesSuit.initialPrice >
                  this.props.credit.available ? (
                    <div />
                  ) : (
                    <button
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
                      value={dataChoiceEvents.partyClothesSuit.initialPrice}
                      onClick={this.props.payForClothingByCash}
                    >
                      Cash
                    </button>
                  )}
                </div>
              </div>
            )}
            <div>
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
            <div>
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
    },
    payForClothingByCash: e => {
      dispatch(cashChange(e.target.value));
      dispatch(increaseTurnCount());
    },
    payForClothingByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(increaseTurnCount());
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
