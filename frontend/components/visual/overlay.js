let React = require('react');
let Cross = require('./cross');
let ConfirmationBox = require('../forms/confirmationBox');
let SendResetLinkForm = require('../forms/sendResetLinkForm');
let LoginForm = require('../forms/loginForm');
let SignupForm = require('../forms/signupForm');

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login' }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
   document.body.style.overflow = null;
  }
 
 handleKeyDown(event) {
 event.key === 'Escape' ?  this.props.onclose() : null  
 }
    
 handleScroll(event) {
 event.preventDefault();
 document.body.style.overflow = 'hidden';
 }

 render() {
   return (
    <div className='overlay' tabIndex="0" onKeyDown={this.handleKeyDown.bind(this)}>
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

