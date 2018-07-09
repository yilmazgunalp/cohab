let React = require('react');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.username.current.value,this.password.current.value);
  }

  render() {
    return (
      <form  onSubmit={this.handleSubmit} className='login-form'>
        <label>
          Username:
          <input type="text" ref={this.username} />
        </label>
        <label>
          Password:
          <input type="text" ref={this.password} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

module.exports = LoginForm;
