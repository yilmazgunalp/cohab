import React  from 'react';
import { useState } from 'react';

require('./conversation.scss');
import MessageBox from '../messageBox/messageBox.js';
import Message from './message.js';
import {MessagesContext} from './messagesContext.js';

export default function ConversationList({con,test}) {

    console.log('CONVERSATIONLIST', con)
    return(
      <div className='conversation-list' >
      {Array.from(con).map((c,i) => <Conversation messages={c[1].messages} key={c[0] +'conv'} from={c[0]}/> )}
        </div>
      
  )  
}


function Conversation(props) {
  const [form,showForm] = useState(false)
  return(
      <div className='conversation' >
        <header onClick={() => showForm(!form)}>
          {props.from}
        </header>
        <div className='message-list'>
          {props.messages.map(({from,body}) => <Message from={from} body={body} key={from + 'message'}/>)}
        </div>
    {form && <MessageBox to={props.from}/>}
      </div> 
  )

}
