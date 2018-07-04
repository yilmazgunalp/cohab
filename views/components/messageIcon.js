let React = require('react');
let Icon = require('./icon');

function MessageIcon(props) {
 return (
    <Icon className='message-icon'>
    {props.message}
    </Icon>

 );
    
}

module.exports = MessageIcon;
