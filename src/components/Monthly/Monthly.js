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
  state = {
    groceriesDisabled: false,
    miscellaneousDisabled: false,
    travelDisabled: false,
    phoneDisabled: false,
    wageDisabled: false,
    creditCardDisabled: false,
    creditOwed: (this.props.financialInfo.wallet.credit.max -
    this.props.financialInfo.wallet.credit.available
    )
  }
    render() {
        const financialInfo = this.props.financialInfo
        console.log(this.state.creditOwed, this.props.APR)
        return (
            <React.Fragment>    
                <div>
                Wage:£{financialInfo.wage}{'     '}
                  <button 
                    value={-financialInfo.wage}
                    onClick={(e) => {
                      this.props.payByCash(e)
                      this.setState({wageDisabled:true})
                    }}
                    disabled={this.state.wageDisabled}
                  >collect wage
                  </button>
                </div>
                <div>
                    Living Costs
                    {Object.keys(financialInfo.living_costs).map(key => {
                      return <p key={shortId.generate()}>
                      {key}:£{financialInfo.living_costs[key]}
                      <button
                      value={financialInfo.living_costs[key]}
                      disabled={this.state[`${key}Disabled`]}
                      onClick={e => {
                        this.props.payByCredit(e)
                        this.setState({[`${key}Disabled`]: true})
                      }}
                      >Credit
                      </button>
                      <button
                      value={financialInfo.living_costs[key]}
                      disabled={this.state[`${key}Disabled`]} 
                      onClick={(e) => {
                        this.props.payByCash(e)
                        this.setState({[`${key}Disabled`]: true})
                      }}
                      >Cash
                      </button>
                      </p>  
                    })}
                </div>
                <div>Credit Card 
                  
                  <button
                    value={-this.state.creditOwed}
                    onClick={e => {
                      this.setState({creditCardDisabled: true})
                      this.props.payByCredit(e)
                    }}
                   
                    disabled={this.state.creditCardDisabled}
                    >Pay Full Amount
                  </button>
                  <button
                  onClick= {() => {this.setState({creditCardDisabled: true})}}
                  disabled={this.state.creditCardDisabled}
                  >Pay Interest
                  </button>
                  <button
                  value={Math.floor(this.state.creditOwed/100 *this.props.financialInfo.wallet.APR /12)}
                  onClick={e => {
                    this.props.payByCredit(e)
                    console.log('hi')
                    this.setState({creditCardDisabled: true})
                    }
                  }
                  disabled={this.state.creditCardDisabled}
                  >Don't Pay This Month
                  </button>
                  </div>
                <button onClick>Next Chapter</button>
            </React.Fragment>   
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      payByCash: (e) => {
        dispatch(cashChange(e.target.value));
      },
      payByCredit: (e) => {
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
  