let React = require('react');
let Cross = require('./cross');
let ConfirmationBox = require('../forms/confirmationBox');
let SendResetLinkForm = require('../forms/sendResetLinkForm');
let LoginForm = require('../forms/loginForm');
let SignupForm = require('../forms/signupForm');

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login' }
  }
    
 render() {
   return (
    <div className='overlay' >
      <Cross  onClose={this.props.onclose}/>
      {this.props.children ? this.props.children : 
      this.state.form === 'login' ? 
      <LoginForm handleSubmit={this.props.handleLogin} showResetPswdForm={()=> this.setState({form: 'reset'})} 
      showSignupForm={()=> this.setState({form: 'signup'})}/> : 
      this.state.form === 'reset' ? 
      <SendResetLinkForm /> : 
      this.state.form === 'signup' ? 
      <SignupForm/> : null}
    </div>
    );
  }
}


module.exports = Overlay;
