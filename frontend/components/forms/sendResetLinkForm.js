let React = require('react');
let ConfirmationBox = require('../forms/confirmationBox');
let Error = require('../visual/error');

class ResetPswdForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.email = React.createRef();
    this.state = {showConfirmation: false, errors: null}
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.email.current.value)
    fetch('http://localhost:8000/user/sendresetlink',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({email: this.email.current.value})
            })
    .then(resp => { 
      if(resp.status === 401) {resp.json().then(data => this.setState({errors: data.errorMessage}))}
      if(resp.ok) { this.setState({ showConfirmation: true}) } 
      
      })
    .catch(e => console.log(e))
  }

  render() {
    return (
        this.state.showConfirmation ? <ConfirmationBox className="reset-pswd"/> : 
				<form  onSubmit={this.handleSubmit} className='login-form'>
         <Error message={this.state.errors}/>
          <h2>Password Reset</h2>
          <div className='form-input'>
            <label>
              e-mail
              <input type="text" autoComplete="email" ref={this.email} />
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = ResetPswdForm;
