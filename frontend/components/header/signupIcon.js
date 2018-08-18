let React = require('react');
let Icon = require('../visual/icon');

function SignupIcon(props) {

 function handleClick(e) {
    e.preventDefault();
    props.onClick(e);
  } 

 return (
    <Icon className='signup-icon'>
    <button id='signup-button' onClick={handleClick}>
    Sign Up!
    </button>
    </Icon>

 );
    
}

module.exports = SignupIcon;

