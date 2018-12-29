import React  from 'react';
require('./inbox.scss');
import MessageBox from '../messageBox/messageBox.js';
import store from '../../redux/store';

export default class Inbox  extends React.Component {
  constructor(props) {
    super(props)  
  }  

  render() {
    return(
      <div className='inbox'>
        <header>
          Messages
        </header>
        <div className='message-list'>
        </div>
        <MessageBox/>        
      </div> 
  )  
}
}

