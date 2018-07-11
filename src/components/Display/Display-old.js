import React, { Component } from 'react';
import './Display.css';

// to procedurally generate the chapters:

// make a chapterCounter that starts at 0  - intro and ends at last number - finale start and end always the same

// between the start and end, we want to randomly display chapters AS LONG AS THEY'VE NOT JUST BEEN DISPLAYED

// can do this with object.keys[Math.random] * length of storyBoard

// strip intro and end off storyboard and put in own object

// TO IMPLEMENT:

// store current key on state

class Display extends Component {
  state = {
    storyBook: [
      {
        text: 'You want to buy a house and need a loan'
      },
      {
        text: 'To realise this dream you must build up your credit rating'
      },
      {
        text:
          'A good credit rating will show the bank you are a responsible customer able to pay off your debts'
      },
      {
        text: 'To increase credit rating you will need a credit card',
        choices: ['cardA', 'cardB', 'cardC']
      },
      {
        text: 'Good choice'
      },
      {
        text: 'Now you have the choice to pay by cash or card.'
      },
      {
        text: 'You will be paid monthly and must decide how to manage this'
      }
    ],
    turnCount: 1
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
      storyLines.unshift(<p>{storyBook[i].text}</p>);
    }
    const buttons = (
      <div>
        {storyBook[turnCount - 1].choices ? (
          storyBook[turnCount - 1].choices.map(choice => {
            return <button>{choice}</button>;
          })
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
}

export default Display;
