let React = require('react');
let Event = require('../event/event');
let Button  = require('../visual/button');
let Overlay = require('../visual/overlay');
import {connect} from 'react-redux';
import './feed.css';

class Feed extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {events: null};
  }  
  
  componentDidMount() {
    fetch('http://localhost:8000/event/getAll')
    .then(resp => resp.json()).then(data => this.setState({events: data}))
    .catch(e => console.log('couldnt get evsents',e));
  }
  render() {
    if(this.state.events) {
    return(
      <div className='feed'>
     {this.props.user && <header><Button onClick={()=> this.setState({form: 1})}label='Post an Event' primary={true}/></header>}
      {this.state.events.map((event,i)=> 
        <Event {...event} key={i}/>
      )}
      {this.state.form &&  <Overlay onclose={()=> this.setState({form: 0})}>Hello</Overlay>}
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
