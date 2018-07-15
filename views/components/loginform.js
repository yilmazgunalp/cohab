let React = require('react');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.username.current.value,this.password.current.value);
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
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
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = LoginForm;
