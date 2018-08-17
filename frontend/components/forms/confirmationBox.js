let React = require('react');

function ConfirmationBox(props) {
   return props.className === 'signup' ? 
  <div className={'confirmation '+  props.className}>
  <h2> Great!</h2>
  <p>We have sent a confirmation link to your e-mail address<br/>Please check your email to activate your account</p>
  </div> : 
  <div className={'confirmation '+  props.className}>
  <h2> Cool!</h2>
  <p>We have sent a confirmation link to your e-mail address<br/>Please check your email to reset your password</p>
  </div> 

}

module.exports = ConfirmationBox;
