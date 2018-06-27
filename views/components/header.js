let React = require('react');
let Icon = require('./icon');
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
    }
    componentWillMount() {
        
         fetch('http://localhost:8000/user/auth',{credentials: 'include'}).then(resp => resp.text()).then(data => this.setState({user: data})).
         catch(e => console.log('COULD NOT AUTHORIZE USER',e));
    }

renderForm() {
  this.setState({showform: true});   
    }
render() {
let WelcomeIcon = Icon({className: 'welcome-icon',key: 'wel-icon',children: ['Hello ',this.state.user]});
let MsgIcon = Icon({className: 'message-icon',key: 'msg-icon',style: {width: 36, height:36,background: 'url("components/images/blue.png") no-repeat',backgroundSize: 'contain'}});
let loginIcon = Icon({className: 'login-icon',key: 'login-icon',style: {float: 'right', height:36},children: ['Please Login']});

    return ( <div>
                <nav className= 'nav-bar'>
                {this.state.user != 'guest' ? <div>{WelcomeIcon}{MsgIcon}</div> : <div onClick={this.renderForm}>{loginIcon}</div>}
                </nav>
                {this.state.showform ? Overlay() : null}
            </div>
            )
    }
}
module.exports = Header;
