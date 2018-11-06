import React  from 'react';
require('./event.css')
import Button from '../visual/button';

class Event extends React.Component {
  constructor(props) {
    super(props)  
    this.handleDelete = this.handleDelete.bind(this);
  }  

 handleDelete() {
    fetch('http://localhost:8000/event/delete',{credentials: 'same-origin',method: 'POST',body: JSON.stringify({_id: this.props._id}),headers: {'Content-Type': 'application/json'}})
    .then(resp => resp.json()).then(data => this.props.login(data))
    .catch(e => console.log('COULD NOT AUTHORIZE USER',e));
 }
  
  render() {
    return(
      <section className='event-box'>
        <div className='event-header'>
          <div className='event-date'>
            <span>{new Date(this.props.startTime).toDateString()}</span>
          </div>
          <div className='event-place'>
            <span>{this.props.place}</span>
          </div>
        </div>
        <div className='event-content'>
          <div className='event-img'>
            <img src='https://picsum.photos/80'/>
          </div>
          <div className='event-details'>
            <h2 className='event-name'>{this.props.name}</h2>
            <p className='event-desc'>{this.props.description}</p>
          </div>
        </div>
          <div className='event-info'>
          {this.props.ownEvent && <Button label='Delete'className='delete-event'onClick={this.handleDelete}/>}
          <div className='event-poster'> posted by: {this.props.postedBy.username}</div>    
        </div>
      </section> 
  )  
}
}

module.exports = Event;

