import React  from 'react';
import { useState } from 'react';
import store from '../../redux/store';
import {readMessage} from '../../redux/actions';

require('./conversation.scss');
import MessageBox from '../messageBox/messageBox.js';
import Message from './message.js';
import {MessagesContext} from './messagesContext.js';

export default function ConversationList({con}) {
  const [convo,showOne] = useState()
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
  const showMe = (from) => {
    store.dispatch(readMessage(from));
    props.showMe(from);
  }
  return(
      <div className='conversation' onClick={() => showMe(props.from)} > 
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
    {props.form && <MessageBox to={props.from}/>}
      </div> 
  )
}
