import React, { Component } from 'react';
import './Card.css';
import { connect } from "react-redux"
import { cardSelectionEvent } from '../../redux/actions/PlayerInfoAction';

class Card extends Component {
  render() {
    return (
      <section className="card">
        <button value="LOW" onClick={this.props.handleClick}>Low</button>
        <button value="MEDIUM" onClick={this.props.handleClick} >Medium</button>
        <button value="HIGH" onClick={this.props.handleClick}>High</button>
        <p>{this.props.wallet.rating}</p>
      </section>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e) => {
      dispatch(cardSelectionEvent(e.target.value))
    }
  }
}
const mapStateToProps = store => {
  return {
    wallet: store.playerInfo.wallet
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);