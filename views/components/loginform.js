let React = require('react');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form  {...this.props}>
        <label>
          Name:
          <input type="text" ref={input => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

module.exports = LoginForm;
