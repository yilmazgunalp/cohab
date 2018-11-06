let React = require('react');
let Event = require('../event/event');
let Button  = require('../visual/button');
import EventForm from '../forms/eventForm';
import {connect} from 'react-redux';
import './feed.css';

import store from '../../redux/store';

class Feed extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {events: null};
    this.showForm = this.showForm.bind(this);
  }  
  
  componentDidMount() {
    fetch('http://localhost:8000/event/getAll')
    .then(resp => resp.json()).then(data => this.setState({events: data}))
    .catch(e => console.log('couldnt get evsents',e));
  }

  showForm() {
    store.dispatch({type: 'SHOW_MODAL', modal: {show: 1, content: <EventForm/>}})    
  }

  render() {
    if(this.state.events) {
    return(
      <div className='feed'>
     {this.props.user && <header><Button onClick={this.showForm} label='Post an Event' primary={true}/></header>}
      {this.state.events.map((event,i)=> 
        <Event {...event} ownEvent={this.props.user === event.postedBy.username} key={i}/>
      )}
      </div>
    )}  
    
    return(
      <div className='feed'>
      Loading...
      </div>
      )
  }
}

const mapStateToProps = state => {
    return { user: state.user }  
  }

module.exports = connect(mapStateToProps)(Feed);
