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
            <span>{this.props.startTime.toDateString()}</span>
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
        <div className='event-poster'> posted by: {this.props.postedBy}</div>    
      </section> 
  )  
}
}

module.exports = Event;

