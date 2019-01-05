import React  from 'react';
import { useState } from 'react';

require('./conversation.scss');
import MessageBox from '../messageBox/messageBox.js';
import Message from './message.js';
import {MessagesContext} from './messagesContext.js';

export default function ConversationList({con,test}) {
  const [convo,showOne] = useState()
 console.log( convo,'CONCO')
    console.log('CONVERSATIONLIST', con)
    return(
      <div className='conversation-list' >
      <header onClick={() => showOne(0)}>
      Conversations
      </header>
      {convo ? 
        <Conversation messages={con.get(convo).messages} from={convo} showMe={showOne} form={1}/> 
      :
      Array.from(con).map((c,i) => <Conversation messages={c[1].messages} key={c[0] +'conv'} from={c[0]} showMe={showOne}/> )}
        </div>
      
  )  
}


function Conversation(props) {
  console.log(props,'FORMMMM')
  return(
      <MessagesContext.Consumer>
      {({_,addMessage}) => (
      <div className='conversation' onClick={() => props.showMe(props.from)} > 
        <header>
          {props.from}
        </header>
        <div className='message-list'>
          { props.form ? 
          props.messages.map((m,i) => <Message from={m.from} body={m.body} key={i}/>)
            :
            <Message from={props.from} body={props.messages[props.messages.length-1].body}/>
          }
        </div>
    {props.form && <MessageBox to={props.from} addMessage={addMessage}/>}
      </div> 
  )}
      </MessagesContext.Consumer>
  )
}
