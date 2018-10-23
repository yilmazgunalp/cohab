import React from 'react';
import ConfirmationBox from '../forms/confirmationBox';
import Error from '../visual/error';
import Button  from '../visual/button';
import './forms.scss';

export default class EventForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null, 
      formStage: 0, 
      showConfirmation: false, 
      eventname: "",
      organizer: "",
      place: "",
      startTime: ''
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPlaceId = this.getPlaceId.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loc = React.createRef();
    this.autocompleteoptions = {componentRestrictions: {country: 'au'}};
}

componentDidMount() {
this.location = new google.maps.places.Autocomplete(this.loc.current,this.autocompleteoptions);
this.location.addListener('place_changed', this.getPlaceId);
}

componentDidUpdate() {
    if(!this.state.formStage){
      this.location = new google.maps.places.Autocomplete(this.loc.current,this.autocompleteoptions);
      this.location.addListener('place_changed', this.getPlaceId);
    }
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value)

    this.setState({
      [name]: value,
    });
}

getPlaceId() {
let eventPlace = this.location.getPlace();
if(eventPlace) {
this.setState({place: eventPlace.place_id});
}
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
    console.log('inside render')
    return (
        this.state.showConfirmation ? <ConfirmationBox className="signup"/> : 
				<form  onSubmit={this.handleSubmit} className='event-form'>
         <Error message={EventForm.formErrors(this.state)}/>
          <h2>Post an Event</h2>
          {!this.state.formStage ? 
          <div className='form-stage'>
          <div className='form-input'>
            <label>
              Place
              <input id="pac" name='place' type="text" onChange={this.getPlaceId} ref={this.loc}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Event Name
              <input name='eventname' type="text" value={this.state.eventname} onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Organizer
              <input name='organizer' type="text" value={this.state.organizer} onChange={this.handleInputChange}/>
            </label>
          </div>
          <Button onClick={()=> this.setState({formStage: 1})} label='Next' secondary={true} className="next-button" />
          </div>
          :
          <div className='form-stage'>
          <div className='form-input'>
            <label>
              Event Description
              <textarea name='description' rows="5" col="33" onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Start Time
              <input name='startTime' value={this.state.startTime} type="datetime-local" onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className='form-input'>
            <label>
              Finish  Time
              <input name='finish-time' type="datetime-local" onChange={this.handleInputChange}/>
            </label>
          </div>
       <div className='form-submit'>
       <Button onClick={this.handleSubmit} disabled={EventForm.formErrors(this.state)} label="Post" className='submit-button' />
       </div>
       <Button onClick={()=> this.setState({formStage: 0})} label='Back' secondary={true} className="back-button"/>
       </div> }
      </form>
      );
  } }

