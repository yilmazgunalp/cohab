let React = require('react');
let Error = require('../visual/error');
let Button = require('../visual/button')
import store  from '../../redux/store';
require('./messageForm.scss');

export default class MessageForm  extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.message = React.createRef();
    this.state = {errors: null}
  }

  handleSubmit(event) {
  event.preventDefault();
     this.props.handleSubmit(this.message.current.value);
     this.message.current.value = '';
  }

  render() {
    return (
				<form  onSubmit={this.handleSubmit} className='message-form'>
         <Error message={this.state.errors}/>
          <div className='form-input'>
            <label>
              <input className='message-input' type="message"  ref={this.message} />
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" value="Send" />
       </div>
      </form>
      );
  }
}

