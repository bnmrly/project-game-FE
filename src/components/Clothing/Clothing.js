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
        <div>
          <p>Party clothing suit</p>
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
          <button
            value={dataChoiceEvents.partyClothesSuit.initialPrice}
            onClick={this.props.payForClothingByCash}
          >
            Cash
          </button>
        </div>
        <div>
          <p>Smart casual clothing</p>
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
          <button
            value={dataChoiceEvents.smartCasual.initialPrice}
            onClick={this.props.payForClothingByCash}
          >
            Cash
          </button>
        </div>
        <div>
          <p>Casual clothing</p>
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
          <button
            value={dataChoiceEvents.casualClothes.initialPrice}
            onClick={this.props.payForClothingByCash}
          >
            Cash
          </button>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
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
  return { credit: store.playerFinancialInfo.wallet.credit };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clothing);
