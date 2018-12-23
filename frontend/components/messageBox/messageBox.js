import React  from 'react';
require('./messageBox.scss')
import Button from '../visual/button';
import Socket from '../../socket/websocket.js';
import MessageForm from '../forms/messgeForm.js';
import store from '../../redux/store';

export default class MessageBox  extends React.Component {
  constructor(props) {
    super(props)  
    this.handleSend = this.handleSend.bind(this);
    this.websocket = new Socket('ws://localhost:4040');
  }  

 handleSend(body) {
     let message = {type: 'chat',to: this.props.to,from: store.getState().user,body}
    this.websocket.send(JSON.stringify(message));
 }
  
  render() {
      console.log(store.getState().user)
    return(
      <section className='message-box'>
        <header>
        To: {this.props.to}
        </header>
        <div className='message-content'>
        <MessageForm handleSubmit={this.handleSend}/>
        </div>
      </section> 
  )  
}
}

