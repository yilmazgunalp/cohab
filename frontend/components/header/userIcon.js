let React = require('react');
let Icon = require('../visual/icon');

function UserIcon(props) {

    function handleClick(e) {
      e.preventDefault();
      props.onClick(e);
    } 

 return (
    <Icon className='user-icon' onClick={handleClick}/>
 );
    
}

module.exports = UserIcon;
