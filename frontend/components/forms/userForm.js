import React from 'react';
import SignupForm from './signupForm.js';
import ResetForm from './sendResetLinkForm.js';
import LoginForm from './loginForm';
import Button from '../visual/button.js';
export default class UserForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login'};
  }

  render() {
    return (
      <div>
          <Button flat={true} onClick={() => this.setState({form: 'signup'})} label='Sign Up'/>
          {this.state.form === 'login' ? <LoginForm/> :
          this.state.form === 'signup' ? <SignupForm/>
          : <ResetForm/>}
          <span id='resetPswd-form' onClick={() => this.setState({form: 'reset'})}> Forgot Password?</span>
      </div>
      );
  }
}

