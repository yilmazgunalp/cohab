let React = require('react');
import {connect} from 'react-redux';
import {login,logout,renderInbox,newMessage} from '../../redux/actions';
import store  from '../../redux/store';
import Socket from '../../socket/websocket.js';
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
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.websocket = new Socket('ws://localhost:4040');

    this.websocket.addMessageListener(this.handleNewMessage)
  }
  
  componentDidMount() {
    fetch('http://localhost:8000/user/authenticate',{credentials: 'same-origin',method: 'POST'})
    .then(resp => resp.json()).then(data => this.props.login(data))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));

    fetch('http://localhost:8000/message/getAll',{
          credentials: 'same-origin',
          })
    .then(resp => resp.json())
    .then(data => {
      store.dispatch({type:  'INITIALIZE_INBOX',conversations: mapConversationsFromBackend(data,this.props.user)})
    })
    .catch(e => console.log('COULD NOT GET CONVERSATIONS',e));
  }

 handleLogout() {
    fetch('http://localhost:8000/user/logout',{ credentials: 'same-origin', })
    .then(resp => resp.status === 200  ? this.setState({form: 0}) : null)
    .then(() => store.dispatch(logout()))
  }     

  handleNewMessage(socketMessage) {
   this.props.newMessage(JSON.parse(socketMessage.data));
  }

  showForm() {
    store.dispatch({type: 'SHOW_MODAL', modal: {show: 1, content: <UserForm/>}})    
  }
  
  render() {
    return ( <div>
                <nav className= 'nav-bar'>          
                    <Logo/>
                    <UserStatusBar  user={this.props.user} onMessageClick={this.props.renderInbox} 
                    onLoginClick={this.showForm} onLogoutSubmit={this.handleLogout} unreadMessages={this.props.unreadMessages}/>
                </nav>
            </div>
            )
  }
}

const mapStateToProps = state => {
  console.log( state.unreadMessages.size,'header')
    return { user: state.user,unreadMessages: state.unreadMessages.size }  
  }

const mapDispatchToProps = {login,logout,renderInbox,newMessage}  

module.exports = connect(mapStateToProps,mapDispatchToProps)(Header);



const mapConversationsFromBackend = (conversations,user) => {
    return conversations.reduce((acc,convo) => {
     let from = convo.between.split('_')
                .filter(e => e !== user)[0];
      acc.set(from,{messages: convo.messages})
      return acc;
    },new Map())  
}
