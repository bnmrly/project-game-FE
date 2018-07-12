import React, { Component } from 'react';
import './Display.css';
import data from '../../data/gameplay.json';
import Card from '../Card/Card';
import Name from '../Name/Name';
import shortId from 'short-id';

// TO IMPLEMENT:

// store current key on state

class Display extends Component {
  state = {
    storyBook: data.fixedChapters.intro,
    turnCount: 1,
    chapterCount: 0
  };
  render() {
    return (
      <section className="display__container">{this.storyRevealer()}</section>
    );
  }

  storyRevealer = () => {
    const storyLines = [];
    const { storyBook, turnCount } = this.state;
    for (let i = 0; i < turnCount; i++) {
      storyLines.unshift(<p key={shortId.generate()}>{storyBook[i].text}</p>);
    }
    const buttons = (
      <div key={shortId.generate()}>
        {storyBook[turnCount - 1].choices ? (
          storyBook[turnCount - 1].choices.forEach(choice => {
            switch (choice) {
              case 'Card':
                storyLines.unshift(
                  <div key={shortId.generate()} onClick={this.nextClickHandler}>
                    <Card />
                  </div>
                );
                break;
              case 'Name':
                storyLines.unshift(
                  // <div key={shortId.generate()} onClick={this.nextClickHandler}>
                  <Name />
                  // </div>
                );
              default:
                console.log('dummy text');
            }
          })
        ) : turnCount === storyBook.length ? (
          <button onClick={this.nextChapterClickHandler}>next chapter</button>
        ) : (
          <button onClick={this.nextClickHandler}>next</button>
        )}
      </div>
    );
    storyLines.unshift(buttons);
    return storyLines;
  };

  nextClickHandler = () => {
    this.setState({
      turnCount: this.state.turnCount + 1
    });
  };
  nextChapterClickHandler = () => {
    if (this.state.chapterCount === 3) {
      this.setState({
        storyBook: data.fixedChapters.finale,
        turnCount: 1,
        chapterCount: 4
      });
    } else {
      this.setState({
        storyBook:
          data.storyBoard[
            Object.keys(data.storyBoard)[Math.floor(Math.random() * 4)]
          ],
        turnCount: 1,
        chapterCount: this.state.chapterCount + 1
      });
    }
  };
}

export default Display;
