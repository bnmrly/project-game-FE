import React, { Component } from "react";
import "./Card.css";
import { connect } from "react-redux";
import {
  cardSelectionEvent,
  increaseTurnCount
} from "../../redux/actions/PlayerInfoAction";
import { cardDecision } from '../../firebase/fb';

class Card extends Component {
  render() {
    return (
      <section className="card">
        <button value="LOW" onClick={this.props.handleClick}>
          Low
        </button>
        <button value="MEDIUM" onClick={this.props.handleClick}>
          Medium
        </button>
        <button value="HIGH" onClick={this.props.handleClick}>
          High
        </button>
        <p>{this.props.wallet.rating}</p>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      cardDecision(e.target.value)
      dispatch(cardSelectionEvent(e.target.value));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    wallet: store.playerFinancialInfo.wallet
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
