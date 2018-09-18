let React = require('react');
let Event = require('../event/event');

class Feed extends React.Component {
  constructor(props) {
    super(props)   
  }  
  
  render() {
    let eventprops = {name: 'An Awesone Event',place: 'Cavendish Palace',description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        startTime: new Date(),postedBy: 'count olaf'};
    return(
      <div className='feed'>
            <Event {...eventprops}/>
      </div>
    )  
  }
}

module.exports = Feed;

