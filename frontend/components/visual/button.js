let React = require('react');
let path = require('path');
require('./button.css');

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disabled: false}
    this.handleonClick = this.handleonClick.bind(this);
  }

  handleonClick(e) {
    //this.setState({disabled: true});
    this.props.onClick(e);
  }

  render() {
   return (
      <button id={this.props.id} onClick={this.handleonClick} className={
        'default ' + (this.props.primary ? 'primary' : this.props.secondary ? 'secondary' : this.flat ? 'flat' : '') + ' ' + this.props.className } disabled={this.state.disabled}> 
      {this.props.label}
      </button>
   )
  }


}

module.exports = Button;

