let React = require('react');

class SignupForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formValid: true}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.password.current.value != this.confirmPassword.current.value) {
        alert('Passwords do not match! Please re-enter password') 
        this.setState({formValid: false});
        }
    this.props.handleSubmit(this.username.current.value,this.email.current.value,this.password.current.value);
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
          <h2>Sign Up</h2>
          <div className='form-input'>
            <label>
              username
              <input type="text" autoComplete='username' ref={this.username} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              e-mail
              <input type="text" autoComplete='email' ref={this.email} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              password
              <input type="password"  autoComplete='new-password' ref={this.password} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              confirm password
              <input type="password"  autoComplete='new-password' ref={this.confirmPassword} />
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = SignupForm;