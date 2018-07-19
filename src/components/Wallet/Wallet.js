import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
class Wallet extends Component {
  render() {
    return (
      <section
        className="wallet__container"
        // style={{
        //   width: '80%'
        // }}
      >
        <div>
          <p className="progress__top">Credit Rating</p>
          <CircularProgressbar
            className="rating"
            percentage={this.props.wallet.rating / 10}
            text={this.props.wallet.rating}
          />
          <p className="progress">Available Credit</p>
          <CircularProgressbar
            className="credit"
            percentage={
              (this.props.wallet.credit.available /
                this.props.wallet.credit.max) *
              100
            }
            text={`£${this.props.wallet.credit.available}/£${
              this.props.wallet.credit.max
            }`}
          />
          <p className="progress">Cash</p>
          <CircularProgressbar
            className="cash"
            text={`£${this.props.wallet.cash}`}
            percentage={100}
          />
        </div>
      </section>
    );
  }
}
const mapStateToProps = store => {
  return {
    wallet: store.playerFinancialInfo.wallet
  };
};
export default connect(
  mapStateToProps,
  null
)(Wallet);
