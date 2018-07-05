let React = require('react');
let ReactDOM = require('react-dom');

require('../test.css')

//Imported Components
let UserBar = require('./userStatusBar');
let LoginForm = require('./loginform');
let Overlay = require('./overlay');

class  Header extends React.Component  {

  constructor(...args) {
    super(...args)
    this.state = { user: null, showform: false};
    this.renderForm = this.renderForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.leform =  React.createRef();
  }
  
  componentWillMount() {
    fetch('http://localhost:8000/user/auth',{credentials: 'same-origin'})
    .then(resp => resp.text()).then(data => this.setState({user: data}))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

  handleLogin(event) {
    event.preventDefault();
    let forminfo = {username: this.leform.current.input.value};
    console.log(forminfo);
    fetch('http://localhost:8000/user/login',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(forminfo)
            }).then(resp => resp.json()).then(data => this.setState({user: data.username,showform: false}))
  }
  
 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.ok ? this.setState({user: null,showform: false}) : null);
  }     
  
  renderForm() {
      this.setState({showform: true});   
  }
        
  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <UserBar message={'Hello ' + (this.state.user || 'Guest')} isLoggedIn={this.state.user} 
                    onLoginSubmit={this.renderForm} onLogoutSubmit={this.handleLogout}
                    />
                </nav>
                {this.state.showform ? Overlay({leform: this.leform,handleSubmit: this.handleLogin}) : null}
            </div>
            )
  }
                                                    
}

module.exports = Header;

