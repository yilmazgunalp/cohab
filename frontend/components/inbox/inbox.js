import React  from 'react';
require('./inbox.scss');
import MessageBox from '../messageBox/messageBox.js';
import Socket from '../../socket/websocket.js';
import store from '../../redux/store';
import Message from './message.js';
import ConversationList from './conversation.js';
import {MessagesContext} from './messagesContext.js';
import {login,logout,renderInbox,newMessage} from '../../redux/actions';
import {connect} from 'react-redux';

class Inbox  extends React.Component {

  constructor(props) {
    super(props)  
    this.websocket = new Socket('ws://localhost:4040');
  }  

  render() {
    let conversations = this.props.conversations;
    return(
      <MessagesContext.Provider value={{conversations}}>
      <div className='inbox'>
      <MessagesContext.Consumer>
      {({conversations}) => <ConversationList con={conversations}/>}
      </MessagesContext.Consumer>
      </div> 
      </MessagesContext.Provider>
    )
}

}

const mapStateToProps = state => {
    return { conversations: new Map(state.conversations),unreadMessages: state.unreadMessages }  
  }

const mapDispatchToProps = {newMessage}  

module.exports = connect(mapStateToProps,mapDispatchToProps)(Inbox);
