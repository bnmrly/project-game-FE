import React, { Component } from "react";
import "./Monthly.css";
import { connect } from "react-redux";
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount,
  changeCreditRating,
  enableChapterChange,
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
    disabledCount: 0,
    nextChapterDisabled: true,
    randomEvent: {},
    creditOwed:
      this.props.financialInfo.wallet.credit.max -
      this.props.financialInfo.wallet.credit.available,
    modalIsOpen: false,
    modalOpened: false
  };
  render() {
    const financialInfo = this.props.financialInfo;
     if (((!financialInfo.living_costs.phone && this.state.disabledCount === 5) 
     || this.state.disabledCount === 6) && this.state.nextChapterDisabled){
      this.setState({nextChapterDisabled:false})
      this.props.enableNextChapter()
     }
    return (
      <section className="monthly">
        <div className="container__wage">
          Wage: £{financialInfo.wage}
          <button
            className="button__monthly"
            value={-financialInfo.wage}
            onClick={e => {
              this.props.payByCash(e);
              this.setState({ wageDisabled: true, disabledCount: this.state.disabledCount + 1});
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
              this.setState({ creditCardDisabled: true, disabledCount: this.state.disabledCount + 1 });
              this.props.payOffCard(e);
              this.props.creditRatingChanger(this.state.creditOwed, financialInfo.wallet.credit.max)
            }}
            disabled={this.state.creditCardDisabled}
          >
            Pay Full Amount
          </button>

          <button
            className="button__monthly"
            onClick={(e) => {
              this.setState({ creditCardDisabled: true, disabledCount: this.state.disabledCount + 1 });
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
              this.props.failToPay();  
              this.setState({ creditCardDisabled: true, disabledCount: this.state.disabledCount + 1 });
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
                
                {financialInfo.living_costs[key] > financialInfo.wallet.credit.available &&
                financialInfo.living_costs[key] > financialInfo.wallet.cash ? 
                <button
                className="button__monthly"
                value={-financialInfo.wage}
                onClick={e => {
                  this.props.payByCash(e);
                  this.setState({ wageDisabled: true, disabledCount: this.state.disabledCount + 1});
                }}
                disabled={this.state.wageDisabled}
              >
                collect wage
              </button>
                : <span>
                {financialInfo.living_costs[key] > financialInfo.wallet.credit.available ? ('') : <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCredit(e);
                    this.setState({ [`${key}Disabled`]: true, disabledCount: this.state.disabledCount + 1 });
                  }}
                >
                  Credit
                </button>}
               {financialInfo.living_costs[key] > financialInfo.wallet.cash ? ('') : <button
                  className="button__monthly"
                  value={financialInfo.living_costs[key]}
                  disabled={this.state[`${key}Disabled`]}
                  onClick={e => {
                    this.props.payByCash(e);
                    this.setState({ [`${key}Disabled`]: true, disabledCount: this.state.disabledCount + 1 });
                  }}
                >
                  Cash
                </button> }
                </span>
                }
                
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
    enableNextChapter: () => {
      dispatch(enableChapterChange())
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