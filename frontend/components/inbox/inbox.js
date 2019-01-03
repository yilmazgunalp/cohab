import React  from 'react';
require('./inbox.scss');
import MessageBox from '../messageBox/messageBox.js';
import Socket from '../../socket/websocket.js';
import store from '../../redux/store';
import Message from './message.js';
import ConversationList from './conversation.js';
import {MessagesContext} from './messagesContext.js';

export default class Inbox  extends React.Component {

  constructor(props) {
    super(props)  
    this.state = {conversations: new Map(), test: 'testcontext string'};
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
    console.log( this.state,'Inbox STATE')
    return(
      <MessagesContext.Provider value={this.state}>
      <div className='inbox'>
        <header>
          Messages
        </header>
      <MessagesContext.Consumer>
      {({conversations,test}) => <ConversationList con={conversations} test={test}/>}
      </MessagesContext.Consumer>
      </div> 
      </MessagesContext.Provider>
    )
}

  updateConversations(message) {
    let conversation = this.state.conversations.get(message.from);
    if(conversation){
      conversation.messages.push(message);
      this.setState((prevState)=> {
        // this is DANGEROUS!!!!
        let tempConversations = prevState.conversations;
        tempConversations.set(message.from,conversation);
        return {conversations: tempConversations}
      })
    } else {
   this.setState((prevState) => 
     ({conversations: prevState.conversations.set(message.from,{from: message.from,messages: [message]})}));
    }
}
}

