let React = require('react');
let Header = require('../header/header');
let Feed = require('../feed/feed');
import Inbox from '../inbox/inbox.js';
import {connect} from 'react-redux';
import Overlay from '../visual/overlay';
import WS from '../../socket/websocket.js';

class App extends React.Component {
  constructor(props) {
   super(props)   
   new WS('ws://192.168.99.101:4040', _ => console.log('Can not initialize Websocket connection!!!'));
  }  

  render() {
    return(
      <div>
        {this.props.modal.show ? <Overlay content={this.props.modal.content}/> : null}
        <Header/>
        <main>
          {this.props.renderInbox ? <Inbox/> : <Feed/> }
        </main>
      </div>
    )  
  }
}

const mapStateToProps = state => {
    return {user: state.user,modal: state.modal,renderInbox: state.renderInbox}  
  }

module.exports = connect(mapStateToProps)(App);
