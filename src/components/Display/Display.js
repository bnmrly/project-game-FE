import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
  state = {
    storyBook: [
      'You want to buy a house and need a loan',
      'To realise this dream you must build up your credit rating',
      'A good credit rating will show the bank you are a responsible customer able to pay off your debts',
      'To increase credit rating you will need a credit card',
      'Good choice',
      'Now you have the choice to pay by cash or card.',
      'You will be paid monthly and must decide how to manage this'
    ]
  };
  render() {
    const { storyBook } = this.state;
    return (
      <section className="display__container">
        {storyBook.map(sentence => <p>{sentence}</p>)}
        <button>Next</button>
      </section>
    );
  }
}

export default Display;
