require('./resets.css');
require('./test.css');

let ResetForm = require('./components/resetForm');
let Overlay = require('./components/overlay');
let React = require('react');
let ReactDOM = require('react-dom');
ReactDOM.render(<Overlay><ResetForm/></Overlay>,document.getElementById('root'));

