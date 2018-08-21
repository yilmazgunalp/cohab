let React = require('react');
let ReactDOM = require('react-dom');
let Cross = require('./cross');
let ConfirmationBox = require('../forms/confirmationBox');
let ResetPswdForm = require('../forms/resetPasswordForm');
let LoginForm = require('../forms/loginForm');
let Hoc = require('./hoc')

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login' }
  }
    
 render() {
   return (
    <div className='overlay' >
      <Cross  onClose={this.props.onclose}/>
      {this.state.form === 'login' ? 
      <LoginForm handleSubmit={this.props.handleSubmit} handleResetPswd={()=> this.setState({form: 'reset'})}/> : 
      this.state.form === 'reset' ? 
      <ResetPswdForm /> : null}
    </div>
    );
  }
}


module.exports = Overlay;
