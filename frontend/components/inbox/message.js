import React  from 'react';
require('./message.scss');

export default function Message({from,body,key})  {
    return(
      <div className='message' key={key}>
        <header>
          {from}
        </header>
        <div className='message-body'>
          {body}
        </div>
      </div> 
  )  
}

