let React = require('react');
let Cross = require('./cross');


function Overlay(props) {
 return (
    <div className='overlay' >
    <Cross  onClose={props.onclose}/>
    {props.children}
    </div>
    );
}

module.exports = Overlay;
