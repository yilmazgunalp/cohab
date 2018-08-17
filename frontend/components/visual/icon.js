let React = require('react');

function Icon(props) {
return ( 
    <div className={'nav-icon '+ props.className}>
    {props.children}
    </div>
    );
}

module.exports = Icon;
