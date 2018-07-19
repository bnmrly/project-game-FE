import React, { Component } from 'react';
import './Display.css';
import data from '../../data/gameplay.json';
import Card from '../Card/Card';
import Name from '../Name/Name';
import Job from '../Job/Job';
import Clothing from '../Clothing/Clothing';
import Phone from '../Phone/Phone';
import Tonight from '../Tonight/Tonight';
import Monthly from '../Monthly/Monthly';
import PersonalInvestment from '../PersonalInvestment/PersonalInvestment';
import shortId from 'short-id';
import { connect } from 'react-redux';
import {
  increaseTurnCount,
  resetTurnCount,
  resetGame,
  disableChapterChange
} from '../../redux/actions/PlayerInfoAction';
import nextButton from '../../assets/button-arrow-green.png';
import Typing from 'react-typing-animation';
import { getDecision } from '../../firebase/fb';

// TO IMPLEMENT:

// store current key on state

class Display extends Component {
  state = {
    storyBook: data.fixedChapters.intro,
    chapterCount: 0,
    lastChapterName: ''
  };
  render() {
    return (
      <section className="display__container">{this.storyRevealer()}</section>
    );
  }

  storyRevealer = () => {
    const storyLines = [];
    const { storyBook } = this.state;

    storyLines.push(
      <p key={shortId.generate()} className="p__storyline">
        {<Typing>{storyBook[this.props.turnCount - 1].text}</Typing>}
      </p>
    );
    const buttons = (
      <React.Fragment>
        {storyBook[this.props.turnCount - 1].choices ? (
          storyBook[this.props.turnCount - 1].choices.forEach(choice => {
            switch (choice) {
              case 'Card':
                storyLines.push(<Card />);
                break;
              case 'Name':
                storyLines.push(<Name />);
                break;
              case 'Job':
                storyLines.push(<Job />);
                break;
              case 'Clothes':
                storyLines.push(<Clothing />);
                break;
              case 'Phone':
                storyLines.push(<Phone />);
                break;
              case 'Tonight':
                storyLines.push(<Tonight />);
                break;
              case 'Personal Investment':
                storyLines.push(<PersonalInvestment />);
                break;
              case 'Monthly':
                storyLines.push(
                  <Monthly />,
                  <div className="container__next-button">
                    <button
                      className="button__4"
                      onClick={(e) => {
                        getDecision('bin', 'thatdoesntmattereither', 'neitherdoesthis', true)
                        this.nextChapterClickHandler(e)
                        this.props.disableNextChapter()
                      }}
                      disabled={this.props.nextChapterDisabled}
                    >
                      next chapter
                    </button>
                  </div>
                );
                break;
              case 'End of Chapter':
                storyLines.push(
                  <div>
                    <button
                      className="button__next"
                      onClick={this.props.turnIncrement}
                    >
                      Month End
                    </button>
                  </div>
                );
                break; case 'End Of Game Win':
                storyLines.push(
                  <div>
                    <button
                      className="button__reset"
                      onClick={() => { this.props.reset('win') }}
                    >
                    </button>
                  </div>
                )
                break;
              case 'End Of Game Lose':
                storyLines.push(
                  <div>
                    <button
                      className="button__reset"
                      onClick={() => { this.props.reset('lose') }}
                    >
                      Reset
                  </button>
                  </div>
                )
                break;
              default:
                console.log('blah blah text');
            }
          })
        ) : (
            // <button className="button__next" onClick={this.props.turnIncrement}>
            //   next
            // </button>

            <img
              className="image__next"
              src={nextButton}
              alt=""
              onClick={this.props.turnIncrement}
            />
          )}
      </React.Fragment>
    );
    storyLines.push(buttons);
    return storyLines;
  };
  nextChapterClickHandler = () => {
    // if finishing penultimate chapter, go to last chapter
    if (this.state.chapterCount === 3) {
      this.props.turnReset();
      // if minimum win value credit rating reached
      if (this.props.credit_rating > 650) {
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
    turnIncrement: () => {
      dispatch(increaseTurnCount());
    },
    turnReset: () => {
      dispatch(resetTurnCount());
    },
    reset: (winOrLose) => {
      dispatch(resetGame())
    },
    disableNextChapter: () => {
      dispatch(disableChapterChange())
    }
  };
};
const mapStateToProps = store => {
  return {
    turnCount: store.gameProgress.turn_count,
    credit_rating: store.playerFinancialInfo.wallet.rating,
    nextChapterDisabled: store.gameProgress.nextChapterDisabled
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
