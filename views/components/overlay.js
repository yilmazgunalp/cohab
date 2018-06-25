let React = require('react');

let LoginForm = require('./loginform');
function Overlay() {
let styles = {background: '#3b5c78',opacity: '0.9',position: 'absolute',width: '100%',height: '100%'};
 return (
    <div style={styles} >
    <LoginForm style={{position: 'absolute',top: '50%',left: '40%'}}/> 
    </div>);
    
}

module.exports = Overlay;
