let React = require('react');
let ReactDOM = require('react-dom');

require('../test.css')

//Imported Components
let UserBar = require('./userStatusBar');
let LoginForm = require('./loginform');
let SignupForm = require('./signupform');
let Overlay = require('./overlay');
let ConfirmationBox = require('./confirmationBox');

class  Header extends React.Component  {

  constructor(...args) {
    super(...args)
    this.state = { user: null, showform: false,form: null, formErrors: null, showSignupConfirmation: false};
    this.renderForm = this.renderForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentWillMount() {
    fetch('http://localhost:8000/user/auth',{credentials: 'same-origin',method: 'POST'})
    .then(resp => resp.text()).then(data => this.setState({user: data}))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

  handleLogin(username,password) {
    fetch('http://localhost:8000/user/login',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({username,password})
            })
    .then(resp => { 
    if(resp.status == 401) {
        resp.json().then(data => this.setState({formErrors: data.errorMessage}));
    } else {
    resp.json().then(data => this.setState({user: data.username,showform: false}));}
    })
    .catch(e => console.log(e))
  }
  
 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.ok ? this.setState({user: null,showform: false}) : null);
  }     

  handleSignup(username,email,password) {
    fetch('http://localhost:8000/user/signup',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({username,email,password})
            })
    .then(resp => { if(resp.ok) { this.setState({showform: false, showSignupConfirmation: true}) } })
    .catch(e => console.log(e))
  }
  
  renderForm(e) {
    let form = e.target.id.split('-')[0];
    this.setState(prevState => ({showform: !prevState.showform, form,formErrors: null}));   
  }
        
  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <UserBar message={'Hello ' + (this.state.user || 'Stranger!')} isLoggedIn={this.state.user} 
                    onLoginClick={this.renderForm} onLogoutSubmit={this.handleLogout} 
                    />
                </nav>
                {this.state.showform ?  <Overlay onclose={this.renderForm}> 
                    {this.state.form === 'login' ?  
                    <LoginForm errors={this.state.formErrors} handleSubmit={this.handleLogin}/> : 
                    <SignupForm handleSubmit={this.handleSignup}/> 
                    }
                </Overlay> : null}
                {this.state.showSignupConfirmation ?  <Overlay onclose={() => this.setState({showSignupConfirmation: false}) }> 
                    <ConfirmationBox className="signup-confirmation"/>
                </Overlay> : null}
            </div>
            )
  }
                                                    
}

module.exports = Header;

