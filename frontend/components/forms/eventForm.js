import React from 'react';
import {connect} from 'react-redux';
import ConfirmationBox from '../forms/confirmationBox';
import Error from '../visual/error';
import Button  from '../visual/button';
import './forms.scss';

import * as U from '../../utils/utils';
import {Success,Failure} from 'folktale/validation';
import Validation from 'folktale/validation';

const notEmpty = (field,value) => 
    U.isEmpty(value) ? Failure([`${field} cant be empty`])
    : 								 Success(value);

const validateFormStage0 = data => 
    Success().concat(notEmpty('place', data.place))
             .concat(notEmpty('placeName', data.placeName))
             .concat(notEmpty('name', data.name))
             .concat(notEmpty('organizer', data.organizer));

const validateFormStage1 = data => 
    Success().concat(notEmpty('startTime', data.startTime).concat(Validation.fromResult(U.parseDateString(data.startTime))))
             .concat(notEmpty('endTime', data.endTime))
             .concat(notEmpty('description', data.description))

export default class EventForm  extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      errors: null, 
      formStage: 0, 
      showConfirmation: 0, 
      name: "",
      organizer: "",
      description: "",
      placeID: "",
      placeName: "",
      place: '',
      startTime: '',
      endTime: ''
     }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPlaceId = this.getPlaceId.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.loc = React.createRef();
    this.autocompleteoptions = {componentRestrictions: {country: 'au'}};
}

componentDidMount() {
    this.location = new google.maps.places.Autocomplete(this.loc.current,this.autocompleteoptions);
    this.location.addListener('place_changed', this.getPlaceId);
}

componentDidUpdate() {
    if(!this.state.formStage) {
    this.location = new google.maps.places.Autocomplete(this.loc.current,this.autocompleteoptions);
    this.location.addListener('place_changed', this.getPlaceId);
    }
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
}

getPlaceId(value) {
    let eventPlace = this.location.getPlace();
    console.log(eventPlace)
    if(eventPlace) {this.setState({place: eventPlace.formatted_address,placeID: eventPlace.place_id, placeName: this.loc.current.value})}
}

handleErrors(event) {
   this.setState({errors: null});
   if(!this.state.formStage) {
      let partState = U.partObj(['place','placeName','organizer','name'],this.state);
      validateFormStage0(partState).matchWith({
      Success: (value) => this.setState({formStage: 1}),
      Failure: ({value}) => this.setState({errors: value})
     });
  }else{
      let partState = U.partObj(['description','startTime','endTime'],this.state);
      validateFormStage1(partState).matchWith({
      Success: (value) => this.handleSubmit(event),
      Failure: ({value}) => this.setState({errors: value})
     });
  }
}

static formErrors(state) {return  state.errors ? state.errors : null};

handleSubmit(event) {
    event.preventDefault();
    let formData = U.partObj(['name','place','description','startTime','endTime','placeID'],this.state);
    fetch('http://localhost:8000/event/create',{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(Object.assign(formData,{postedBy: this.props.user}))
       })
    .then(resp => {if(resp.ok) {this.setState({showConfirmation: true})}})
    .catch(e => console.log(e))
}

render() {
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
              <input name='name' type="text" value={this.state.name} onChange={this.handleInputChange}/>
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
              <textarea name='description' rows="5" col="33" value={this.state.description} onChange={this.handleInputChange}/>
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
             <input name='endTime' value={this.state.endTime} type="datetime-local" onChange={this.handleInputChange}/>
            </label>
          </div>
       <div className='form-submit'>
       <Button onClick={this.handleErrors} disabled={EventForm.formErrors(this.state)} label="Post" className='submit-button' />
       </div>
       <Button onClick={()=> this.setState({formStage: 0})} label='Back' secondary={true} className="back-button"/>
       </div>}
      </form>
      );
}}

const mapStateToProps = state => ({user: state.user});

module.exports = connect(mapStateToProps)(EventForm);
