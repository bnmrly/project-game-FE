import React, { Component } from 'react';
import './Monthly.css';
import { connect } from 'react-redux';
import {
  cashChange,
  changeAvailableCredit,
  increaseTurnCount
} from '../../redux/actions/PlayerInfoAction';
import shortId from 'short-id';
import { randomEvents } from '../../data/gameplay.json';
import data from '../../data/gameplay.json';

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
    creditOwed: (this.props.financialInfo.wallet.credit.max -
    this.props.financialInfo.wallet.credit.available
    )
  }
    render() {
      const financialInfo = this.props.financialInfo
      console.log(this.state)
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
                  <div>random Event 
                    <button disabled={this.state.randomDisabled} onClick={() => this.randomEventHandler(randomEvents)}>Risk a random Event</button>
                    <div>{this.state.randomEvent.text} </div>
                  </div>
                  <div>
                    {this.state.groceriesDisabled && this.state.miscellaneousDisabled && this.state.travelDisabled && 
                    (this.state.phoneDisabled || financialInfo.living_costs.phone === undefined) && this.state.wageDisabled && this.state.creditCardDisabled ?
                    <button onClick={this.nextChapterClickHandler}>next chapter</button>
                  :  <button disabled onClick={this.nextChapterClickHandler}>next chapter</button>
                  }

                  </div>
            </React.Fragment>   
        )
    }
    randomEventHandler = (randomEvents) => {
      const newRandomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)]
      this.props.randomCashChanger(newRandomEvent.value)
      this.setState({randomDisabled: true, randomEvent:newRandomEvent})
    }
    nextChapterClickHandler = () => {
      // if finishing penultimate chapter, go to last chapter
      if (this.state.chapterCount === 3) {
        this.props.turnReset();
        // if minimum win value credit rating reached
        if (this.props.credit_rating > 299) {
          this.setState({
            storyBook: data.fixedChapters.finaleWin,
            chapterCount: 4
          });
          // else win condition fail
        } else {
          this.setState({
            storyBook: data.fixedChapters.finaleLose,
            chapterCount: 4
          });
        }
      } else {
        this.props.turnReset();
        const storyboardKeys = Object.keys(data.storyBoard);
        const storyPos = Math.floor(Math.random() * 4);
        // pick a random chapter using Math.random
        const nextChapterKey = storyboardKeys[storyPos];
        // if it picks the same chapter as you have just played
        if (this.state.lastChapterName === nextChapterKey) {
          // check if chapter is last chapter from array of keys
          if (!storyboardKeys[storyPos + 1]) {
            // if last chapter, run first chapter from array of keys
            this.setState({
              storyBook: data.storyBoard[storyboardKeys[0]],
              chapterCount: this.state.chapterCount + 1,
              lastChapterName: storyboardKeys[0]
            });
            //else run next chapter in array of keys
          } else {
            this.setState({
              storyBook: data.storyBoard[storyboardKeys[storyPos + 1]],
              chapterCount: this.state.chapterCount + 1,
              lastChapterName: storyboardKeys[storyPos + 1]
            });
          }
          // if not the same chapter, run the chapter that has been randomly picked
        } else {
          this.setState({
            storyBook: data.storyBoard[nextChapterKey],
            chapterCount: this.state.chapterCount + 1,
            lastChapterName: nextChapterKey
          });
        }
      }
    };
}

const mapDispatchToProps = dispatch => {
    return {
      payByCash: (e) => {
        dispatch(cashChange(e.target.value));
      },
      payByCredit: (e) => {
        dispatch(changeAvailableCredit(e.target.value));
      },
      randomCashChanger: (value) => {
        dispatch(cashChange(value))
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
  