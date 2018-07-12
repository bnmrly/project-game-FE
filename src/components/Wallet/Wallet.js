import React, { Component } from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
class Wallet extends Component {
  render() {
    return (
      <section className="wallet__container">
        <div style={{
          width: "150px"
        }}>
          <CircularProgressbar className="rating"
            percentage={this.props.wallet.rating / 10}
            text={"Rating"} />
          <CircularProgressbar className="credit"
            percentage={(this.props.wallet.credit.available / this.props.wallet.credit.max) * 100}
            text={`£${this.props.wallet.credit.available}/£${this.props.wallet.credit.max}`} />
          <b> Cash : £{this.props.wallet.cash}</b>
        </div>
      </section >
    );
  }
}
const mapStateToProps = store => {
  return {
    wallet: store.playerInfo.wallet
  }
}
export default connect(mapStateToProps, null)(Wallet)