let React = require('react');
let Icon = require('../visual/icon');

function LogoutIcon(props) {

 function handleClick(e) {
    e.preventDefault();
    props.onClick();
  } 

 return (
    <Icon className='login-icon'>
    <button onClick={handleClick}>
    Log out
    </button>
    </Icon>

 );
    
}

module.exports = LogoutIcon;

