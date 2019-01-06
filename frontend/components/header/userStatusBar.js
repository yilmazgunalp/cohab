let React = require('react');
let MessageIcon = require('./messageIcon');
let LoginIcon = require('./loginIcon');
let LogoutIcon = require('./logoutIcon');
let SignupIcon = require('./signupIcon');
let UserIcon = require('./userIcon');

export default class UserStatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log( this.props,'UserStatusBar')
   if (this.props) {
  return (
    <div className='user-status-bar'>
      <MessageIcon onClick={this.props.onMessageClick} unreadMessages={this.props.unreadMessages}/>
    <UserIcon onClick={this.props.onLogoutSubmit}/>
    </div>
  );} else {
    return ( 
    <div className='user-status-bar'>
    <LoginIcon onClick={this.props.onLoginClick}/>
    </div>
    );
  }
  }
}

