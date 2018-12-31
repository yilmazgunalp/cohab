import React  from 'react';
require('./inbox.scss');
import MessageBox from '../messageBox/messageBox.js';
import Socket from '../../socket/websocket.js';
import store from '../../redux/store';
import Message from './message.js';
import Conversation from './conversation.js';

export default class Inbox  extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {conversations: new Map()};
    this.newMessage = this.newMessage.bind(this);
    this.updateConversations = this.updateConversations.bind(this);
    this.websocket = new Socket('ws://localhost:4040');
    this.websocket.addMessageListener(this.newMessage)
  }  

  newMessage(socketMessage) {
   console.log(socketMessage.data);
   this.updateConversations(JSON.parse(socketMessage.data));
  }
  render() {
    return(
      <div className='inbox'>
        <header>
          Messages
        </header>
        <div className='conversation-list'>
        {Array.from(this.state.conversations).map((c) => <Conversation key={c[0]} from={c[1].from}  m={c[1].messages}/>)}
        </div>
      </div> 
    )
}

  updateConversations(message) {
    let conversation = this.state.conversations.get(message.from);
    if(conversation){
      conversation.messages.push(message);
      console.log( conversation)
      this.setState((prevState)=> {
        // this is DANGEROUS!!!!
        let tempConversations = prevState.conversations;
        tempConversations.set(message.from,conversation);
        return {conversations: tempConversations}
      })
    } else {
      console.log( 'inside ELSE',message)
   this.setState((prevState) => 
     ({conversations: prevState.conversations.set(message.from,{from: message.from,messages: [message]})}));
    }
}
}

