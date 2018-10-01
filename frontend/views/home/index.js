require('../../styles/test.css');

let App = require('../../components/app/app');
let React = require('react');
let ReactDOM = require('react-dom');
import store from '../../redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.getElementById('root'));

