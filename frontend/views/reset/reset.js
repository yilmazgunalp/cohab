require('./resets.css');
require('../../styles/test.css');

let PasswordResetForm = require('../../components/forms/passwordResetForm');
let Overlay = require('../../components/visual/overlay');
let React = require('react');
let ReactDOM = require('react-dom');
ReactDOM.render(<Overlay><PasswordResetForm/></Overlay>,document.getElementById('root'));

