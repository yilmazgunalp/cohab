let React = require('react');

function Error(props) {
  return !props.message ? null :
  (<div className="form-error">
  <span className="warn-exc">! </span>
  {props.message}
  </div>)
}
module.exports = Error;
