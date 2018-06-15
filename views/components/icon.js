let React = require('react');

function Icon(props) {
let defaults = {className: 'nav-icon'}
Object.assign(defaults,props);
return <div {...defaults}/>
}

module.exports = Icon;
