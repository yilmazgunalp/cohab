let React = require('react');
let Error = require('../visual/error');
let Button = require('../visual/button')
import SignupForm from './signupForm.js';
import ResetForm from './sendResetLinkForm.js';
import {login,logout} from '../../redux/actions';
import store  from '../../redux/store';
import WS from '../../socket/websocket.js';
require('./loginForm.css');

class LoginForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {errors: null}
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/user/login',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({username: this.username.current.value,
          password: this.password.current.value})
            })
    .then(resp => { 
    if(resp.status == 401) {
        resp.json().then(data => this.setState({errors: data.errorMessage}));
    } else {
    resp.json().then(data => {
      console.log(data);
    store.dispatch(login(data))
    store.dispatch({type: 'HIDE_MODAL',modal: {show: 0}});
   const ws = new WS('ws://192.168.99.101:4040', _ => console.log('Can not initialize Websocket connection!!!'));
    store.dispatch({type: 'CREATE_SOCKET',socket: ws})
      });
    }})
    .catch(e => console.log(e))
  }

  showForm(formToShow) {
    let content = formToShow === 'signup' ? <SignupForm/> : <ResetForm/>;
    store.dispatch({type: 'SHOW_MODAL', modal: {show: 1, content}})    
  }


  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='login-form'>
         <Error message={this.state.errors}/>
          <header>
          <h2>Login</h2>
          </header>
          <div className='form-input'>
            <label>
              Username
              <input type="text" autoComplete="username" ref={this.username} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              Password
              <input type="password" autoComplete="current-password" ref={this.password} />
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = LoginForm;
