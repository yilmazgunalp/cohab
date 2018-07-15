let React = require('react');

class SignupForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formValid: true}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.password.current.value != this.confirmPassword.current.value) {
        alert('Passwords do not match! Please re-enter password') 
        this.setState({formValid: false});
        }
    this.props.handleSubmit(this.username.current.value,this.password.current.value,this.confirmPassword.current.value);
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
          <h2>Sign Up</h2>
          <div className='form-input'>
            <label>
              Username
              <input type="text" ref={this.username} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              Password
              <input type="password"  ref={this.password} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              Confirm Password
              <input type="password"  ref={this.confirmPassword} />
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
