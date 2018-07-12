import React, { Component } from "react";
import "./Job.css";
import { connect } from "react-redux";
import {
  setUserWage,
  increaseTurnCount
} from "../../redux/actions/PlayerInfoAction";
import store from "../../redux/index";

class Job extends Component {
  render() {
    return (
      <section className="job">
        <button value={100} onClick={this.props.handleClick}>
          Job1
        </button>
        <button value={200} onClick={this.props.handleClick}>
          Job2
        </button>
        <button value={300} onClick={this.props.handleClick}>
          Job3
        </button>
        <p />
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(setUserWage(e.target.value));
      dispatch(increaseTurnCount());
    }
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
)(Job);
