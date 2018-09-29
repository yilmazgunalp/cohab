const Event = require('./event');
const mongoose = require('mongoose');
mongoose.connect(config.db);


const createEvent = Event => eventObject => {
  //TO DO
}

const getEvents = Event => () => {
  return Event.find({}).populate({path: 'postedBy',select: 'username'});
}

module.exports = Event => {
  return {
    create: createEvent(Event),
    getAll: getEvents(Event),
  }
} 

