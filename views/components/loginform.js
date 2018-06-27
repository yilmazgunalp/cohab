let React = require('react');
class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let forminfo = {username: this.input.value};
    console.log(forminfo.username);
    fetch('http://localhost:8000/user/login',{
       method: 'POST',
       body: JSON.stringify(forminfo),
  headers:{
    'Content-Type': 'application/json'
  }
        
        }).then(resp => resp.text()).then(data => console.log(data))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} {...this.props}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

module.exports = LoginForm;
