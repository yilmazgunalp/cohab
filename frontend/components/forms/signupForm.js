let React = require('react');
let ConfirmationBox = require('../forms/confirmationBox');
let Error = require('../visual/error');

class SignupForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: null, showConfirmation: false, 
    username: '',email: 'you@example.com',password: '',passwordConfirmation: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

checkUser(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({errors: null});
    fetch('/user/checkuser',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({[name]: value})})
    .then(resp => { if(!resp.ok) { 
      this.setState({errors: `This ${name} is already taken`})}
      else {this.setState({[name]: value})} 
      })
}

  static formErrors(state) {
    return  state.errors ? state.errors :
    (state.password != state.passwordConfirmation) ? 'Passwords do not match' : 
    !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(state.email) ? 'Email is not valid' :
    state.password.length < 6 ? 'Password must be at least 6 characters long' : null
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/user/signup',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({username: this.state.username,
          email: this.state.email,password: this.state.password})
            })
    .then(resp => { if(resp.ok) { this.setState({showConfirmation: true}) } })
    .catch(e => console.log(e))
    }

  render() {
    return (
        this.state.showConfirmation ? <ConfirmationBox className="signup"/> : 
				<form  onSubmit={this.handleSubmit} className='login-form'>
         <Error message={SignupForm.formErrors(this.state)}/>
          <h2>Sign Up</h2>
          <div className='form-input'>
            <label>
              username
              <input name='username' type="text" autoComplete='username' onChange={this.checkUser}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              e-mail
              <input name='email' type="text" autoComplete='email' onChange={this.checkUser}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              password
              <input name='password' type="password"  autoComplete='new-password' onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              confirm password
              <input name='passwordConfirmation' type="password"  autoComplete='new-password' onChange={this.handleInputChange}/>
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" disabled={SignupForm.formErrors(this.state)} value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = SignupForm;
