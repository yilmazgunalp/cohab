import React from 'react';
import SignupForm from './signupForm.js';
import ResetForm from './sendResetLinkForm.js';
import LoginForm from './loginForm.js';
import Button from '../visual/button.js';
import './userForm.scss';

export default class UserForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login'};
  }

  render() {
    const isLoginForm = (this.state.form === 'login');
    return (
      <div className='user-form'>
          {isLoginForm && <Button className='signup-button' flat={true} onClick={() => this.setState({form: 'signup'})} label='Sign Up'/>}
          {this.state.form === 'login' ? <LoginForm/> :
          this.state.form === 'signup' ? <SignupForm/>
          : <ResetForm/>}
          {isLoginForm && <span id='resetPswd-form' onClick={() => this.setState({form: 'reset'})}> Forgot Password?</span>}
      </div>
      );
  }
}

