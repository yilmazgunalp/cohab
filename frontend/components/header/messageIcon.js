let React = require('react');
let Icon = require('../visual/icon');

function MessageIcon(props) {
  console.log( props,'messageicon')
 return (
    <Icon className='message-icon' onClick={props.onClick}>
   {(props.unreadMessages > 0) && <div className='red-dot'>
    {props.unreadMessages}    
   </div>}
    </Icon>

 );
    
}

module.exports = MessageIcon;
