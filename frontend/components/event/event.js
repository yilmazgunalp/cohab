let React = require('react');
require('./event.css')

class Event extends React.Component {
  constructor(props) {
    super(props)  
  }  
  
  render() {
    return(
      <section className='event-box'>
        <div className='event-header'>
          <div className='event-date'>
            <span>{this.props.startTime}</span>
          </div>
          <div className='event-place'>
            <span>{this.props.place}</span>
          </div>
        </div>
        <h2 className='event-name'>{this.props.name}</h2>
        <p className='event-desc'>{this.props.description}</p>
        <div className='event-poster'>{this.props.postedBy}</div>    
      </section> 
  )  
}
}

module.exports = Event;

