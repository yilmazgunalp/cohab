import React  from 'react';
require('./message.scss');

export default function Message({from,body})  {
    return(
      <div className='message' >
        <div className='message-body'>
          {body}
        </div>
      </div> 
  )  
}

