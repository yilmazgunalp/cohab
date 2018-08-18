let React = require('react');
let Error = require('../visual/error');

class ResetForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null};
    this.password = React.createRef();
    this.passwordConfirmation = React.createRef();
  }

  componentWillMount() {
    this.setState({user_id: window.location.search.split('?id=')[1]}) 
  }

  render() {
    return (
				<form  action='user/resetpswd' method='POST' className='login-form'>
         <Error message={this.props.errors}/>
          <h2>Reset Password</h2>
          <div className='form-input'>
            <label>
              Password
              <input type="password" name='password' autoComplete="password" ref={this.password} />
            </label>
          </div>
          <div className='form-input'>
            <label>
              Confirm Password
              <input type="password" autoComplete="password" ref={this.passwordConfirmation} />
            </label>
          </div>
              <input type="hidden"  name='user_id' value={this.state.user_id}/>
       <div className='form-submit'>
       <input type="submit" value="Submit" />
       </div>
      </form>
      );
  }
}

module.exports = ResetForm;
