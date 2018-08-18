let React = require('react');
let Icon = require('../visual/icon');

function WelcomeIcon(props) {
 return (
    <Icon className='welcome-icon'>
    {props.message}
    </Icon>

 );
    
}

module.exports = WelcomeIcon;
