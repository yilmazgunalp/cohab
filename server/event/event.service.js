const Event = require('./event');
const User = require('../user/user');
const mongoose = require('mongoose');
mongoose.connect(config.db);


const createEvent = Event => event => {
 return  User.findOne({username: event.postedBy})
    .then(user => event.postedBy = user)
    .then(_ => Event.create(event))
}

const getEvents = Event => () => {
  return Event.find({}).populate({path: 'postedBy',select: 'username'});
}

const deleteEvent = Event => (event_id) => {
  return Event.deleteOne({_id: event_id}).exec();
}

module.exports = Event => {
  return {
    create: createEvent(Event),
    getAll: getEvents(Event),
    delete: deleteEvent(Event)
  }
} 

