let React = require('react');
import {connect} from 'react-redux';
import {login,logout} from '../../redux/actions';
import store  from '../../redux/store';
require('./header.css')

//Imported Components
import UserStatusBar from './userStatusBar';
let Logo = require('../visual/logo');
import UserForm from '../forms/userForm.js';

class  Header extends React.Component  {
  constructor(...args) {
    super(...args)
    this.state = {form: 0};
    this.handleLogout = this.handleLogout.bind(this);
    this.showInbox = this.showInbox.bind(this);
  }
  
  componentDidMount() {
    fetch('http://localhost:8000/user/authenticate',{credentials: 'same-origin',method: 'POST'})
    .then(resp => resp.json()).then(data => this.props.login(data))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
  }

 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.status === 200  ? this.setState({form: 0}) : null)
    .then(() => store.dispatch(logout()))
  }     

  showForm() {
    store.dispatch({type: 'SHOW_MODAL', modal: {show: 1, content: <UserForm/>}})    
  }
  
  showForm() {
    store.dispatch({type: 'SHOW_MODAL', modal: {show: 1, content: <UserForm/>}})    
  }
  showInbox() {
    store.dispatch({type: 'RENDER_INBOX'})    
  }

  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <Logo/>
                    <UserStatusBar  user={this.props.user} onMessageClick={this.showInbox} 
                    onLoginClick={this.showForm} onLogoutSubmit={this.handleLogout}/>
                </nav>
            </div>
            )
  }
}

const mapStateToProps = state => {
    return { user: state.user }  
  }

const mapDispatchToProps = {login,logout}  

module.exports = connect(mapStateToProps,mapDispatchToProps)(Header);

