let React = require('react');
let Header = require('../header/header');
let Event = require('../event/event');

class App extends React.Component {
  constructor(props) {
    super(props)   
  }  
  
  render() {
    let eventprops = {name: 'event',place: 'my place',description: 'hkjdhkjshkdsjlhlkhsadhklksahdkdhsakl',
        startTime: Date.now(),postedBy: 'count olaf'};
    return(
      <div>
        <Header/>
        <Event {...eventprops}/>
      </div>
    )  
  }
}

module.exports = App;
