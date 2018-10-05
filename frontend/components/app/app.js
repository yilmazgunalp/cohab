let React = require('react');
let Header = require('../header/header');
let Event = require('../event/event');
let Feed = require('../feed/feed');
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props)   
  }  

  render() {
    return(
      <div>
        <Header/>
        <main>
          <Feed>
          </Feed>
        </main>
      </div>
    )  
  }
}

const mapStateToProps = state => {
    return { user: state.user }  
  }

module.exports = connect(mapStateToProps)(App);
