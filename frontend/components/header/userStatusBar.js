let React = require('react');
let MessageIcon = require('./messageIcon');
let LoginIcon = require('./loginIcon');
let LogoutIcon = require('./logoutIcon');
let SignupIcon = require('./signupIcon');
let UserIcon = require('./userIcon');

function UserStatusBar(props) {
  const user = props.user;
   if (user) {
  return (
    <div className='user-status-bar'>
    <MessageIcon/>
    <UserIcon onClick={props.onLogoutSubmit}/>
    </div>
  );} else {
    return ( 
    <div className='user-status-bar'>
    <LoginIcon onClick={props.onLoginClick}/>
    </div>
    );
  }
}

module.exports = UserStatusBar;
