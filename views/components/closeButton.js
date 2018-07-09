let React = require('react');

function CloseButton(props) {
  return  <div className='close-button' onClick={props.onClose}/>;
}

module.exports = CloseButton;
