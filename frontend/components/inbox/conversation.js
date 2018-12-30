import React  from 'react';
require('./conversation.scss');
import MessageBox from '../messageBox/messageBox.js';
import Message from './message.js';

export default class Conversation  extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {messages: []};
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
      <div className='conversation'>
        <header>
          {this.props.from}
        </header>
        <div className='message-list'>
        {this.state.messages.map((e,i) => Message({key: i, ...e}))}
        </div>
        <MessageBox to={this.props.to}/>        
      </div> 
  )  
}
}

