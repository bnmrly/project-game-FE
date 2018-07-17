import React, { Component } from 'react';
import { connect } from 'react-redux';
import { idSetterEvent } from '../../redux/actions/PlayerInfoAction';
import './Login.css';
class Login extends Component {
  state = {
    idInput: ''
  };
  render() {
    return (
      <div className="login-info">
        <p>If you are working solo, please use id zzzzz</p>

        <input
          placeholder="please enter your group id"
          value={this.state.idInput}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={() => this.props.handleClick(this.state.idInput)}
        >
          Login
        </button>
      </div>
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
    id: store.playerMetaData.id
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
