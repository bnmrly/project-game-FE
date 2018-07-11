import React, { Component } from 'react';
import { connect } from 'react-redux';
import { idSetterEvent } from '../../redux/actions/PlayerInfoAction';
class Login extends Component {
  state = {
    idInput: ''
  };
  render() {
    return (
      <React.Fragment>
        <p>If you are working solo, please use id zzzzz</p>
        <input
          placeholder="please enter your group id"
          value={this.state.idInput}
          onChange={this.handleChange}
        />
        {/* if input length isn't 5 throw error? */}
        <button
          type="submit"
          onClick={() => this.props.handleClick(this.state.idInput)}
        >
          Login
        </button>
      </React.Fragment>
    );
  }
  handleChange = e => {
    this.setState({ idInput: e.target.value });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: id => {
      dispatch(idSetterEvent(id));
    }
  };
};
const mapStateToProps = store => {
  return {
    id: store.playerInfo.id
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
