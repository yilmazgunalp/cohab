let React = require('react');
let Error = require('../visual/error');
let Button = require('../visual/button')
require('./loginForm.css');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleResetPswd = this.handleResetPswd.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.username.current.value,this.password.current.value);
  }

  handleResetPswd(e) {
    e.preventDefault();
    this.props.handleResetPswd(e);
  }

  handleSignUp(e) {
   e.preventDefault();
   fetch('user/home');
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
         <Error message={this.props.errors}/>
          <header>
          <h2>Login</h2>
          <Button flat={true} onClick={this.handleSignUp} label='Sign Up'/>
          </header>
          <div className='form-input'>
            <label>
              Username
              <input type="text" autoComplete="username" ref={this.username} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              Password
              <input type="password" autoComplete="current-password" ref={this.password} />
            </label>
          <span id='resetPswd-form' onClick={this.handleResetPswd} style={{color:"red"}}> Forgot Password?</span>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = LoginForm;
