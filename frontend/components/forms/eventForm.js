import React from 'react';
import ConfirmationBox from '../forms/confirmationBox';
import Error from '../visual/error';

export default class EventForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: null, showConfirmation: false, eventname: "",organizer: "",place: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPlaceId = this.getPlaceId.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
}

componentDidMount() {
let options = {componentRestrictions: {country: 'au'}}
let loc = new google.maps.places.Autocomplete(document.getElementById('pac'),options)
loc.addListener('place_changed', this.getPlaceId);
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
}

getPlaceId() {
this.setState({place: loc.getPlace()});
}

  static formErrors(state) {

  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/event/create',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({eventname: this.state.eventname,
          place: this.state.place,organizer: this.state.organizer})
            })
    .then(resp => { if(resp.ok) { this.setState({showConfirmation: true}) } })
    .catch(e => console.log(e))
    }

  render() {
    return (
        this.state.showConfirmation ? <ConfirmationBox className="signup"/> : 
				<form  onSubmit={this.handleSubmit} className='event-form'>
         <Error message={EventForm.formErrors(this.state)}/>
          <h2>Post an Event</h2>
          <div className='form-input'>
            <label>
              Event Name
              <input name='eventname' type="text" onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Organizer
              <input name='organizer' type="text" onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Place
              <input id="pac" name='place' type="text" onChange={this.getPlaceId}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Start Time
              <input name='start-time' type="datetime-local"/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Description
              <textarea name='description' rows="3" col="33"/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Finish  Time
              <input name='finish-time' type="datetime-local"/>
            </label>
          </div>
       <div className='form-submit'>
       <input type="submit" disabled={EventForm.formErrors(this.state)} value="Submit" />
       </div>
      </form>
      );
  } }

