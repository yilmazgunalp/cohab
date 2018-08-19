let React = require('react');
let Icon = require('../visual/icon');
let Button = require('../visual/button')

function LoginIcon(props) {

 function handleClick(e) {
    e.preventDefault();
    props.onClick(e);
  } 

 return (
    <Icon className='login-icon'>
    <Button className='enter-button' id="login-button" onClick={handleClick} label='Enter'/>
    </Icon>
 );
}

module.exports = LoginIcon;

