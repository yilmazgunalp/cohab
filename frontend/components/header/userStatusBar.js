let React = require('react');
let WelcomeIcon = require('./welcomeIcon');
let MessageIcon = require('./messageIcon');
let LoginIcon = require('./loginIcon');
let LogoutIcon = require('./logoutIcon');
let SignupIcon = require('./signupIcon');

function UserStatusBar(props) {
  const isLoggedIn = props.isLoggedIn;
   if (isLoggedIn) {
  return (
    <div className='user-status-bar'>
    <WelcomeIcon message={props.message}/>
    <MessageIcon/>
    <LogoutIcon onClick={props.onLogoutSubmit}/>
    </div>
  );} else {
    return ( 
    <div className='user-status-bar'>
    <WelcomeIcon message={props.message}/>
    <LoginIcon onClick={props.onLoginClick}/>
    or
    <SignupIcon onClick={props.onLoginClick}/>
    </div>
    );
  }
}

module.exports = UserStatusBar;
