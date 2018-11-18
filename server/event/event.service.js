const createEvent = (Event,User) => event => {
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

module.exports = (Event,User) => {
  return {
    create: createEvent(Event,User),
    getAll: getEvents(Event),
    delete: deleteEvent(Event)
  }
} 

