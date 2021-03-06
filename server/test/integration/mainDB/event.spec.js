const chai = require('chai');
const Event = require('../../../event/event');
const mongoose = require('mongoose');
const config = require('../../../config/config');
let expect = chai.expect;
mongoose.Promise = global.Promise;

describe('Event Model tests',()=>{
  let db;

  before(async () => {
    db = await mongoose.createConnection('mongodb://mongo/testdb');
  });
    
  afterEach(async () => {
    await Event.remove({});
  });

  after(async ()=> {
    await db.dropDatabase();
    await db.close();
  });

  describe('Saves event into DB',()=>{
    it('saves a record',async()=>{
    let event = new Event({ name: 'test event', place: 'my place',
    description: 'A crazy event', startTime: new Date(), endTime: new Date(), placeID: 'somePlaceId'})
    await event.save();
    expect(event.isNew).to.be.false;
    });

    it('validates event name exists  before saving',async()=>{
    let event = new Event({  place: 'my place',
    description: 'A crazy event', startTime: new Date() })
    await event.save()
    .then(_ => console.log('Expect not to see this!!!!'))
    .catch(err => expect(err.message).to.match(/validation failed/));
    });

  });

  describe('Event model', ()=> {
    it('defines Event model',async()=>{
      expect(Event).not.to.be.undefined;
      })
    })
});
