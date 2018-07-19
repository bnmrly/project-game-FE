import React, { Component } from 'react';
import { connect } from 'react-redux';
import { idCheckFirebase } from '../../firebase/fb';
import './Login.css';
class Login extends Component {
  state = {
    idInput: 'CVN0bxy15TAVJNbiflLJ'
  };
  render() {
    return (
      <div className="login-info">
        <p>Please enter your group id</p>

        <input value={this.state.idInput} onChange={this.handleChange} />
        <button
          className="button__login"
          type="submit"
          onClick={() => idCheckFirebase(this.state.idInput)}
        >
          Login
        </button>
        {this.props.invalidIdAttempt ? <div>Invalid group Id</div> : <div />}
      </div>
    );
  }
  handleChange = e => {
    this.setState({ idInput: e.target.value });
  };
}

const mapStateToProps = store => {
  return {
    id: store.playerMetaData.id,
    invalidIdAttempt: store.playerMetaData.invalidIdAttempt
  };
};
export default connect(
  mapStateToProps,
  null
)(Login);
