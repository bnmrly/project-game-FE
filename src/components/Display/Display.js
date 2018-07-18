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
  resetTurnCount
} from '../../redux/actions/PlayerInfoAction';

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
      <p key={shortId.generate()} className="p__storyline">{storyBook[this.props.turnCount - 1].text}</p>
    );
    const buttons = (
      <div className="buttons" key={shortId.generate()}>
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
                storyLines.push(<Monthly />)
               break
               case 'End of Chapter':
               storyLines.push(<div><button className="button__next" onClick={this.props.turnIncrement}>Month End</button></div>)
              default:
                console.log('blah blah text');
            }
          })
        ): (
          <button className="button__next" onClick={this.props.turnIncrement}>
            next
          </button>
        )}
      </div>
    );
    storyLines.push(buttons);
    return storyLines;
  };


}
const mapDispatchToProps = dispatch => {
  return {
    turnIncrement: () => {
      dispatch(increaseTurnCount());
    },
  };
};
const mapStateToProps = store => {
  return {
    turnCount: store.gameProgress.turn_count,
    credit_rating: store.playerFinancialInfo.wallet.rating
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
