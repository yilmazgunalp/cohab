let React = require('react');
let WelcomeIcon = require('./welcomeIcon');
let MessageIcon = require('./messageIcon');

function UserStatusBar(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div className='user-status-bar'>
		{isLoggedIn && 
    <WelcomeIcon message={props.message}/>
    <MessageIcon/>}
    {!isLoggedIn && <LoginIcon/>}
    </div>
  );
}

module.exports = UserStatusBar;
