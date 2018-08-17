let React = require('react');
let CloseButton = require('./closeButton');


function Overlay(props) {
 return (
    <div className='overlay' >
    <CloseButton onClose={props.onclose}/>
    {props.children}
    </div>
    );
}

module.exports = Overlay;
