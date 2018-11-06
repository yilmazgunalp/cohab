let React = require('react');
let Header = require('../header/header');
let Event = require('../event/event');
let Feed = require('../feed/feed');
import {connect} from 'react-redux';
import Overlay from '../visual/overlay';

class App extends React.Component {
  constructor(props) {
    super(props)   
  }  

  render() {
    return(
      <div>
        {this.props.modal.show && <Overlay content={this.props.modal.content}/>}
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
    return {user: state.user,modal: state.modal}  
  }

module.exports = connect(mapStateToProps)(App);
