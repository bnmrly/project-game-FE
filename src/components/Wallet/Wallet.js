import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
class Wallet extends Component {
  render() {
    return (
      <section className="wallet__container">
        <div
          style={{
            width: '150px'
          }}
        >
          <p className="p-progress">Credit Rating</p>
          <CircularProgressbar
            className="rating"
            percentage={this.props.wallet.rating / 10}
            text={this.props.wallet.rating}
          />
          <p className="p-progress">Available Credit / Max Credit</p>
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
          <p className="p-progress">Cash</p>
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
