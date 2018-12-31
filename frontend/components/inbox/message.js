import React  from 'react';
require('./message.scss');

export default function Message({from,body,key})  {
  console.log( 'MESSAGE COMPONENT')
    return(
      <div className='message' key={key}>
        <div className='message-body'>
          {body}
        </div>
      </div> 
  )  
}

