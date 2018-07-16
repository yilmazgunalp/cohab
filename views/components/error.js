let React = require('react');

function Error(props) {
  return !props.message ? null :
  (<div className="form-error">
  {props.message}
  </div>)
}

module.exports = Error;
