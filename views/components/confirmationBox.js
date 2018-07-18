let React = require('react');

function ConfirmationBox(props) {
  return (
  <div className={props.className}>
  <h2> Great!</h2>
  <p>We have sent a confirmation link to your e-mail address<br/>Please check your email to activate your account</p>
  </div>)
}

module.exports = ConfirmationBox;
