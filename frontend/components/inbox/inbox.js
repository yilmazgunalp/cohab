import React  from 'react';
require('./inbox.scss');
import MessageBox from '../messageBox/messageBox.js';
import Socket from '../../socket/websocket.js';
import store from '../../redux/store';
import Message from './message.js';

export default class Inbox  extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {conversations: []};
    this.newMessage = this.newMessage.bind(this);
    this.websocket = new Socket('ws://localhost:4040');
    this.websocket.addMessageListener(this.newMessage)
  }  

  newMessage(socketMessage) {
   console.log(socketMessage.data);
   this.setState((prevState) => ({messages: prevState.messages.concat([JSON.parse(socketMessage.data)])}))
  }
  render() {
    console.log(this.state.messages)
    return(
      <div className='inbox'>
        <header>
          Messages
        </header>
        <div className='conversation-list'>
        {this.state.conversations.map((e,i) => new Conversation({key: i, ...e}))}
        </div>
      </div> 
  )  
}

  updateConversations(message) {
    let conversation = this.state.conversations.filter(c => c.from === message.from)[0];
   conversation ?  
  } 

}

