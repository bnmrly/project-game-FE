import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
           <React.Fragment>
               <p>If you are working solo, please use id zzzzz</p>
               <input placeholder="please enter your group id"  />
               {/* if input length isn't 5 throw error? */}
               <button type="submit" >Login</button>
           </React.Fragment>
        );
    }
}

export default Login;