import React, { Component } from 'react';
import './Monthly.css';
import { connect } from 'react-redux';
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import shortId from 'short-id';

class Monthly extends Component {
    render() {
        let cashToPay = 0
        let creditToPay = 0
        const financialInfo = this.props.financialInfo
        return (
            <React.Fragment>    
                <div>
                Wage:£{financialInfo.wage}{'     '}
                <button value={financialInfo.wage}>collect wage</button></div>
                <div>
                    Living Costs
                    {Object.keys(financialInfo.living_costs).map(key => {
                      return <p key={shortId.generate()}>
                      {key}:£{financialInfo.living_costs[key]}
                      <button value={financialInfo.living_costs[key]}>Credit</button>
                      <button value={financialInfo.living_costs[key]}>Cash</button>
                      </p>  
                    })}
                </div>
            </React.Fragment>   
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

      defer: e => {
        dispatch(changeAvailableCredit(e.target.value));
      },
      payByCash: e => {
        dispatch(cashChange(e.target.value));

      },
      payByCredit: e => {
        dispatch(changeAvailableCredit(e.target.value));

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
  )(Monthly);
  