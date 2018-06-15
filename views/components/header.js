let React = require('react');
let Icon = require('./icon');
function Header()  {
    let props= {className: 'nav-bar'};
let icon = Icon({key: 'msg-icon',style: {float: 'right',width: 36, height:36,background: 'url("components/images/blue.png") no-repeat',backgroundSize: 'contain'}});
    return <nav{...props}>{icon}</nav>;
    
    }

module.exports = Header;
