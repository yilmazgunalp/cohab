let React = require('react');
let Icon = require('../visual/icon');

function LoginIcon(props) {

 function handleClick(e) {
    e.preventDefault();
    props.onClick(e);
  } 

 return (
    <Icon className='login-icon'>
    <button id="login-button" onClick={handleClick}>
    Log in
    </button>
    </Icon>

 );
    
}

module.exports = LoginIcon;

