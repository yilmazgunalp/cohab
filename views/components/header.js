let React = require('react');
let UserBar = require('./userStatusBar');
require('../test.css')

let LoginForm = require('./loginform');

let Overlay = require('./overlay');
let ReactDOM = require('react-dom');

class  Header extends React.Component  {

  constructor(...args) {
    super(...args)
    this.state = {
        user: null,
        showform: false
    }
    this.renderForm = this.renderForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.leform =  React.createRef();
  }
  
  componentWillMount() {
    fetch('http://localhost:8000/user/auth',{credentials: 'same-origin'}).then(resp => resp.text()).then(data => this.setState({user: data})).
    catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

  handleSubmit(event,v) {
    event.preventDefault();
    let forminfo = {username: this.leform.current.input.value};
    console.log(forminfo);
    fetch('http://localhost:8000/user/login',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(forminfo),
          headers:{ 'Content-Type': 'application/json' }
            }).then(resp => resp.text()).then(data => this.setState({user: data,showform: false}))
  }
      
  renderForm() {
      this.setState({showform: true});   
  }
        
  render() {
    //let loginIcon = Icon({className: 'login-icon',key: 'login-icon',style: {float: 'right', height:36},children: ['Please Login']});

    return ( <div>
                <nav className= 'nav-bar'>          
                {this.state.user != 'guest' ? <UserBar message={'Hello ' + this.state.user}/> : <div onClick={this.renderForm}>{loginIcon}</div>}
                </nav>
                {this.state.showform ? Overlay({leform: this.leform,handleSubmit: this.handleSubmit}) : null}
                
            </div>
            )
  }
                                                    
}
module.exports = Header;

