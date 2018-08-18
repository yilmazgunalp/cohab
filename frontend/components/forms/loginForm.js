let React = require('react');
let Error = require('../visual/error');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetPswd = this.handleResetPswd.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.username.current.value,this.password.current.value);
  }

  handleResetPswd(e) {
    this.props.handleResetPswd(e);
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
         <Error message={this.props.errors}/>
          <h2>Login</h2>
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
