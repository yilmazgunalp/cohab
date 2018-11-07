let React = require('react');
let ReactDOM = require('react-dom');
let Cross = require('./cross');
let ConfirmationBox = require('../forms/confirmationBox');
let SendResetLinkForm = require('../forms/sendResetLinkForm');
let LoginForm = require('../forms/loginForm');
let SignupForm = require('../forms/signupForm');
import {hideModal} from '../../redux/actions';
import store from '../../redux/store';

import './overlay.scss';

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 'login', top: 0 }
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.setState({top: window.scrollY});
  }

  componentWillUnmount() {
   document.removeEventListener('scroll', this.handleScroll);
   document.body.style.overflow = null;
  }
 
 handleKeyDown(event) {
 event.key === 'Escape' ?  this.handleClose() : null  
 }
    
 handleScroll(event) {
 this.setState({top: window.scrollY});
 document.body.style.overflow = 'hidden';
 }

 handleClose() {
 store.dispatch({type: 'HIDE_MODAL',modal: {show: 0}});
 }

 render() {
   return (
    <div className='overlay' tabIndex="0"  style={{top: this.state.top}} onKeyDown={this.handleKeyDown.bind(this)}>
      <Cross  onClose={this.handleClose}/>
      {this.props.content}
    </div>
    );
  }
}

