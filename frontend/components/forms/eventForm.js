import React from 'react';
import ConfirmationBox from '../forms/confirmationBox';
import Error from '../visual/error';
import Button  from '../visual/button';
import './forms.scss';

import * as U from '../../utils/utils';
import { Success, Failure } from 'folktale/validation';

const notEmpty = (field,value) => 
  U.isEmpty(value) ? Failure([`${field} cant be empty`])
	: 								 Success(value);
const validateForm = data => 
  Success().concat(notEmpty('place', data.place))
           .concat(notEmpty('placeName', data.placeName))
           .concat(notEmpty('eventname', data.eventname))
           .concat(notEmpty('organizer', data.organizer));

export default class EventForm  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null, 
      formStage: 0, 
      showConfirmation: false, 
      eventname: "",
      organizer: "",
      description: "",
      placeID: "",
      placeName: "",
      place: '',
      startTime: '',
      finishTime: ''
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPlaceId = this.getPlaceId.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.loc = React.createRef();
    this.autocompleteoptions = {componentRestrictions: {country: 'au'}};
}

componentDidMount() {
this.location = new google.maps.places.Autocomplete(this.loc.current,this.autocompleteoptions);
this.location.addListener('place_changed', this.getPlaceId);
}

handleInputChange(event) {
    console.log('inside input change');
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
}

getPlaceId(value) {
  console.log('inside getplace')
  let eventPlace = this.location.getPlace();
  if(eventPlace) { this.setState({place: eventPlace.formatted_address,placeID: eventPlace.place_id})}
}

handleErrors() {
 this.setState({errors: null});
 if(!this.state.formStage) {
      let partState = U.partObj(['place','placeName','organizer','eventname'],this.state);
      console.log(partState)
      validateForm(partState).matchWith({
      Success: (value) => console.log('holy shit you did it!!!',value),
      Failure: ({ value }) => this.setState({errors: value})
      });
    
   } else {
   
   }
}

  static formErrors(state) {
    return  state.errors ? state.errors : null;
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
    console.log('inside render',this.state.errors)
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
              <input id="pac" name='placeName' type="text" defaultValue={this.state.placeName} ref={this.loc} onChange={this.handleInputChange}/>
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
          <Button onClick={this.handleErrors} label='Next' secondary={true} className="next-button" />
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
             <input name='finishTime' value={this.state.finishTime} type="datetime-local" onChange={this.handleInputChange}/>
            </label>
          </div>
       <div className='form-submit'>
       <Button onClick={this.handleSubmit} disabled={EventForm.formErrors(this.state)} label="Post" className='submit-button' />
       </div>
       <Button onClick={this.handleErrors} label='Back' secondary={true} className="back-button"/>
       </div> }
      </form>
      );
  } }

