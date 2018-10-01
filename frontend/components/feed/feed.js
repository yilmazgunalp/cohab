let React = require('react');
let Event = require('../event/event');

class Feed extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {events: null};
  }  
  
  componentWillMount() {
    fetch('http://localhost:8000/event/getAll')
    .then(resp => resp.json()).then(data => this.setState({events: data}))
    .catch(e => console.log('couldnt get evsents',e));
  }
  render() {
    console.log(this.props)
    if(this.state.events) {
    return(
      <div className='feed'>
      {this.state.events.map((event,i)=> 
        <Event {...event} key={i}/>
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

module.exports = Feed;

