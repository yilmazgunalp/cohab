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
    this.newMessage = this.newMessage.bind(this);
    this.updateConversations = this.updateConversations.bind(this);
    this.websocket = new Socket('ws://localhost:4040');
    this.websocket.addMessageListener(this.newMessage)

    this.addMessage = message => {
      console.log('ADDMESSAGE',message )
    this.setState(state => ({ conversations: 
      state.conversations.set(message.to,{messages: state.conversations.get(message.to).messages.concat([message])})
    
    }))
    }
    this.state = {conversations: store.getState().conversations || new Map(), addMessage: this.addMessage};
  }  

  newMessage(socketMessage) {
   console.log(socketMessage.data);
   this.updateConversations(JSON.parse(socketMessage.data));
  }

  componentWillUnmount() {
    store.dispatch({type: 'SAVE_CONVERSATIONS',conversations: this.state.conversations}) }

  render() {
    console.log( this.state,'Inbox STATE')
    return(
      <MessagesContext.Provider value={this.state}>
      <div className='inbox'>
        <header>
          Inbox
        </header>
      <MessagesContext.Consumer>
      {({conversations,addMessage}) => <ConversationList con={conversations}/>}
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

