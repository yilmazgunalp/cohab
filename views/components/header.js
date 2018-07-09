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
  }
  
  componentWillMount() {
    fetch('http://localhost:8000/user/auth',{credentials: 'same-origin',method: 'POST'})
    .then(resp => resp.text()).then(data => this.setState({user: data}))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

  handleLogin(username,password) {
    let forminfo = {username};
    console.log(forminfo);
    fetch('http://localhost:8000/user/login',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(forminfo)
            })
    .then(resp => resp.json()).then(data => this.setState({user: data.username,showform: false}))
    .catch(e => console.log(e))
  }
  
 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.ok ? this.setState({user: null,showform: false}) : null);
  }     
  
  renderForm() {
    this.setState(prevState => ({showform: !prevState.showform}));   
  }
        
  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <UserBar message={'Hello ' + (this.state.user || 'Guest')} isLoggedIn={this.state.user} 
                    onLoginSubmit={this.renderForm} onLogoutSubmit={this.handleLogout}
                    />
                </nav>
                {this.state.showform ?  <Overlay onclose={this.renderForm}> <LoginForm handleSubmit={this.handleLogin}/> </Overlay> : null}
            </div>
            )
  }
                                                    
}

module.exports = Header;

