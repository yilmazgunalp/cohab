const chai = require('chai');
const Event = require('./event');
const mongoose = require('mongoose');
const config = require('../config/config');

let expect = chai.expect;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/testdb');


describe('Event Model tests',()=>{

  before(async () => {
    await Event.remove({});
  });
    
  afterEach(async () => {
    await Event.remove({});
  });

  after(async ()=> {
    await mongoose.connection.close();
  });

  describe('Saves event into DB',()=>{
    it('saves a record',async()=>{
    let event = new Event({ name: 'test event', place: 'my place',
    description: 'A crazy event', startTime: new Date() })
    await event.save();
    expect(event.isNew).to.be.false;
    });

    it('validates event name exists  before saving',async()=>{
    let event = new Event({  place: 'my place',
    description: 'A crazy event', startTime: new Date() })
    await event.save()
    .catch(err => expect(err.message).to.match(/validation failed/));
    });

  });
});
