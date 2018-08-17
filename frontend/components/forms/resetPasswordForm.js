let React = require('react');

class ResetPswdForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.email = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.email.current.value);
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
          <h2>Password Reset</h2>
          <div className='form-input'>
            <label>
              e-mail
              <input type="text" autoComplete="email" ref={this.email} />
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = ResetPswdForm;
