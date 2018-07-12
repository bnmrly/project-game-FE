import React, { Component } from 'react';
import './Display.css';
import data from '../../data/gameplay.json';
import Card from '../Card/Card';
import Name from '../Name/Name';
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
    console.log(this.state.storyBook, this.state.lastChapterName);
    return (
      <section className="display__container">{this.storyRevealer()}</section>
    );
  }

  storyRevealer = () => {
    const storyLines = [];
    const { storyBook } = this.state;
    for (let i = 0; i < this.props.turnCount; i++) {
      storyLines.unshift(<p key={shortId.generate()}>{storyBook[i].text}</p>);
    }
    const buttons = (
      <div key={shortId.generate()}>
        {storyBook[this.props.turnCount - 1].choices ? (
          storyBook[this.props.turnCount - 1].choices.forEach(choice => {
            switch (choice) {
              case 'Card':
                storyLines.unshift(<Card />);
                break;
              case 'Name':
                storyLines.unshift(<Name />);
                break;
              default:
                console.log('blah blah text');
            }
          })
        ) : this.props.turnCount === storyBook.length ? (
          <button onClick={this.nextChapterClickHandler}>next chapter</button>
        ) : (
          <button onClick={this.props.turnIncrement}>next</button>
        )}
      </div>
    );
    storyLines.unshift(buttons);
    return storyLines;
  };

  nextChapterClickHandler = () => {
    // if finishing penultimate chapter, go to last chapter
    if (this.state.chapterCount === 3) {
      this.props.turnReset();
      this.setState({
        storyBook: data.fixedChapters.finale,
        chapterCount: 4
      });
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
    }
  };
};
const mapStateToProps = store => {
  return {
    turnCount: store.gameProgress.turn_count
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
