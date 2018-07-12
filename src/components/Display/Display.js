import React, { Component } from "react";
import "./Display.css";
import data from "../../data/gameplay.json";
import Card from "../Card/Card";
import shortId from "short-id";
import { connect } from "react-redux";
import {
  increaseTurnCount,
  resetTurnCount
} from "../../redux/actions/PlayerInfoAction";

// to avoid setting state in render
// chnage if block to create next chapter button
// let that button change state

// TO IMPLEMENT:

// store current key on state

class Display extends Component {
  state = {
    storyBook: data.fixedChapters.intro,
    chapterCount: 0
  };
  render() {
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
              case "Card":
                storyLines.unshift(<Card />);
                break;
              default:
                console.log("dummy text");
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
    if (this.state.chapterCount === 3) {
      this.props.turnReset();
      this.setState({
        storyBook: data.fixedChapters.finale,
        chapterCount: 4
      });
    } else {
      this.props.turnReset();
      this.setState({
        storyBook:
          data.storyBoard[
            Object.keys(data.storyBoard)[Math.floor(Math.random() * 4)]
          ],
        chapterCount: this.state.chapterCount + 1
      });
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
