require('./resets.css');
require('../../styles/test.css');

let ResetForm = require('../../components/forms/resetForm');
let Overlay = require('../../components/visual/overlay');
let React = require('react');
let ReactDOM = require('react-dom');
ReactDOM.render(<Overlay><ResetForm/></Overlay>,document.getElementById('root'));

