import React, { Component } from 'react';
import './Name.css';
import { connect } from 'react-redux';
import { nameSetterEvent, increaseTurnCount } from '../../redux/actions/PlayerInfoAction';
import { initialisePlayer } from '../../firebase/fb';

class Name extends Component {
  state = {
    name: ''
  };
  render() {
    return (
      <section className="name">
        <input
          required="true"
          placeholder="Please enter your name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button value={this.state.name} onClick={(e) => { this.props.handleClick(e, this.props.id) }}>
          Submit
        </button>
      </section>
    );
  }
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, id) => {
      initialisePlayer(e.target.value, id)
      dispatch(nameSetterEvent(e.target.value));
      dispatch(increaseTurnCount());
    }
  };
};
const mapStateToProps = store => {
  return {
    name: store.playerMetaData.name,
    id: store.playerMetaData.id
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name);
