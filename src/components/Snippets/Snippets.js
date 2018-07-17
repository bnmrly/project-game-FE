import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import data from "../../data/gameplay.json";
import { connect } from "react-redux";
import "./Snippets.css";

class Snippets extends Component {
  state = {
    displayedSnippets: [],
    modalIsOpen: false
  };
  render() {
    const snippets = this.state.displayedSnippets;
    return (
      <React.Fragment>
        <button className="hint" onClick={this.openModal}>
          Hint
        </button>
        <div>
          <Modal
            snippets={snippets}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="content w3-animate-opacity"
          >
            <h3 className="close-button" onClick={this.closeModal}>
              X
            </h3>
            <div className="container__snippets">
              {snippets
                .slice()
                .reverse()
                .map(snippet => {
                  return <p className="modal-content">{snippet}</p>;
                })}
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }

  openModal = () => {
    this.addSnippet();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  addSnippet = () => {
    if (this.state.displayedSnippets.length > 0) {
      const newSnippets = [...this.state.displayedSnippets];
      newSnippets.shift();
      this.setState({
        displayedSnippets: [
          ...newSnippets,
          data.educationSnippets[
            Math.floor(Math.random() * data.educationSnippets.length)
          ]
        ]
      });
    } else {
      this.setState({
        displayedSnippets: [
          ...this.state.displayedSnippets,
          data.educationSnippets[
            Math.floor(Math.random() * data.educationSnippets.length)
          ]
        ]
      });
    }
  };
}
const mapStateToProps = store => {
  return {
    turnCount: store.gameProgress.turn_count
  };
};
export default connect(mapStateToProps)(Snippets);
