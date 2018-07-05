let React = require('react');
let Icon = require('./icon');

function LoginIcon(props) {

 function handleClick(e) {
    e.preventDefault();
    props.onClick();
  } 

 return (
    <Icon className='login-icon'>
    <button onClick={handleClick}>
    Please Log in
    </button>
    </Icon>

 );
    
}

module.exports = LoginIcon;

