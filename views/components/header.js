let React = require('react');
let Icon = require('./icon');
require('../test.css')

let LoginForm = require('./loginform');

let ReactDOM = require('react-dom');
class  Header extends React.Component  {

    constructor(...args) {
       super(...args)
       this.state = {
           loggedIn: false,
           showform: false
        }
        this.renderForm = this.renderForm.bind(this);
    }
    componentDidMount() {
        
         fetch('http://localhost:8000/user/auth',{credentials: 'include'}).then(resp => {
           if(resp.status == 200 ) {this.setState({loggedIn: true})};
        });
    }

renderForm() {
  this.setState({showform: true});   
    }
render() {
let MsgIcon = Icon({className: 'message-icon',key: 'msg-icon',style: {float: 'right',width: 36, height:36,background: 'url("components/images/blue.png") no-repeat',backgroundSize: 'contain'}});
let loginIcon = Icon({className: 'login-icon',key: 'login-icon',style: {float: 'right', height:36},children: ['Please Login']});
    return ( <div><nav className= 'nav-bar'>{this.state.loggedIn ? MsgIcon : <div onClick={this.renderForm}>{loginIcon}</div>}</nav>
        {this.state.showform ? <LoginForm /> : null}
            </div>
            )
    }
}
module.exports = Header;
