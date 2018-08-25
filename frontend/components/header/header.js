let React = require('react');
require('./header.css')

//Imported Components
let UserBar = require('./userStatusBar');
let Overlay = require('../visual/overlay');
let Logo = require('../visual/logo');

class  Header extends React.Component  {
  constructor(...args) {
    super(...args)
    this.state = { user: null,form: 0};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentWillMount() {
    fetch('http://localhost:8000/user/authenticate',{credentials: 'same-origin',method: 'POST'})
    .then(resp => resp.text()).then(data => this.setState({user: data}))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

  handleLogin(user) {
    this.setState({form: 0, user: user.username})
  }
  
 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.status === 200  ? this.setState({user: null,form: 0}) : null);
  }     

  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <Logo/>
                    <UserBar  user={this.state.user} 
                    onLoginClick={()=> this.setState({form: 1})} onLogoutSubmit={this.handleLogout}/>
                </nav>
                {this.state.form ?  <Overlay onclose={()=> this.setState({form: 0})} handleLogin={this.handleLogin}/> : null }
            </div>
            )
  }
}

module.exports = Header;

