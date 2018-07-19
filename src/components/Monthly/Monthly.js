import React, { Component } from "react";
import "./Monthly.css";
import { connect } from "react-redux";
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from "../../redux/actions/PlayerInfoAction";
import shortId from "short-id";
import ReactModal from "react-modal";
import { randomEvents } from "../../data/gameplay.json";
import data from "../../data/gameplay.json";
import { resetTurnCount } from "../../redux/actions/PlayerInfoAction";

class Monthly extends Component {
  state = {
    groceriesDisabled: false,
    miscellaneousDisabled: false,
    travelDisabled: false,
    phoneDisabled: false,
    wageDisabled: false,
    creditCardDisabled: false,
    randomDisabled: false,
    randomEvent: {},
    creditOwed:
      this.props.financialInfo.wallet.credit.max -
      this.props.financialInfo.wallet.credit.available,
    modalIsOpen: false,
    modalOpened: false
  };
  render() {
    const financialInfo = this.props.financialInfo;
    return (
      <section className="monthly">
        <div className="container__wage">
          Wage: £{financialInfo.wage}
          <button
            className="button__monthly"
            value={-financialInfo.wage}
            onClick={e => {
              this.props.payByCash(e);
              this.setState({ wageDisabled: true });
            }}
            disabled={this.state.wageDisabled}
          >
            collect wage
          </button>
        </div>
        <div className="container__card">
          <p className="p__monthly ">
            Credit Card: £
            {this.state.creditOwed}
          </p>

          <button
            className="button__monthly"
            value={-this.state.creditOwed}
            onClick={e => {
              this.setState({ creditCardDisabled: true });
              this.props.payOffCard(e);
              this.props.creditRatingChanger(this.state.creditOwed, financialInfo.wallet.credit.max)
            }}
            disabled={this.state.creditCardDisabled}
          >
            Pay Full Amount
          </button>

          <button
            className="button__monthly"
            onClick={() => {
              this.setState({ creditCardDisabled: true });
              this.props.payByCash(e)
              this.props.creditRatingChanger(this.state.creditOwed, financialInfo.wallet.credit.max)
            }}
            disabled={this.state.creditCardDisabled}
          >
            Pay Interest
          </button>

          <button
            className="button__monthly"
            value={Math.floor(
              ((this.state.creditOwed / 100) *
                this.props.financialInfo.wallet.APR) /
                12
            )}
            onClick={e => {
              this.props.payByCredit(e);
              this.props.failToPay()  
            }}
            disabled={this.state.creditCardDisabled}
          >
            Don't Pay This Month
          </button>


        </div>
        <div className="container__costs">
          <p className="p__costs">Living Costs</p>

          {Object.keys(financialInfo.living_costs).map(key => {
            return (
              <p className="p__monthly" key={shortId.generate()}>
                {key}: £{financialInfo.living_costs[key]}
                <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCredit(e);
                    this.setState({ [`${key}Disabled`]: true });
                  }}
                >
                  Credit
                </button>
                <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCash(e);
                    this.setState({ [`${key}Disabled`]: true });
                  }}
                >
                  Cash
                </button>
              </p>
            );
          })}
        </div>
        <div className="container__random">
          Random Event
          <button
            className="button__monthly"
            disabled={this.state.randomDisabled}
            onClick={() => this.openModal(randomEvents)}
          >
            Risk a random Event
          </button>
          <ReactModal
            randomEvent={this.state.randomEvent}
            randomEvents={randomEvents}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="modal modal-animate-opacity"
          >
            {this.state.randomEvent && (
              <div>
                <h3 className="close-button" onClick={this.closeModal}>
                  X
                </h3>{" "}
                <p className="modal-content">{this.state.randomEvent.text}</p>{" "}
              </div>
            )}
          </ReactModal>
        </div>
        <div />
      </section>
    );
  }

  openModal = () => {
    console.log(randomEvents);
    this.randomEventHandler(randomEvents);
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  randomEventHandler = randomEvents => {
    const newRandomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];
    this.props.randomCashChanger(newRandomEvent.value);
    this.setState({ randomDisabled: true, randomEvent: newRandomEvent });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    payByCash: e => {
      dispatch(cashChange(e.target.value));
    },
    payByCredit: e => {
      dispatch(changeAvailableCredit(e.target.value));
    },
    randomCashChanger: value => {
      dispatch(cashChange(value));
    },
    creditRatingChanger: (creditOwed, maxCredit) => {
      let direction
       if (creditOwed/maxCredit * 100 < 75){
        direction = 'up' 
      } 
      else {
        direction = 'down'
      }
      dispatch(changeCreditRating(direction))
    },
    failToPay: () => {
      dispatch(changeCreditRating("down"))
    },
    payOffCard: e => {
      dispatch(changeAvailableCredit(e.target.value));
      dispatch(cashChange(-e.target.value));
    },
  };
};
const mapStateToProps = store => {
  return {
    financialInfo: store.playerFinancialInfo
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monthly);