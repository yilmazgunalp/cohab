import React  from 'react';
require('./conversation.scss');
import MessageBox from '../messageBox/messageBox.js';
import Message from './message.js';

export default class Conversation  extends React.Component {
  constructor(props) {
    super(props)  
  }  

  render() {
    console.log('INSIDE RENDER',this.state)
    return(
      <div className='conversation' key={this.props.from}>
        <header>
          {this.props.from}
        </header>
        <div className='message-list'>
        {this.props.m.map((e,i) => Message({key: i, ...e}))}
        </div>
        <MessageBox to={this.props.from}/>        
      </div> 
  )  
  }
}

