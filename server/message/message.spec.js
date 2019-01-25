
const chai = require('chai');
const Conversation = require('./message');
const mongoose = require('mongoose');
const config = require('../config/config');
let expect = chai.expect;
mongoose.Promise = global.Promise;

describe('Conversation Model tests',()=>{
  let db;

  before(async () => {
    db = await mongoose.createConnection('mongodb://localhost/testdb');
  });
    
  afterEach(async () => {
    await Conversation.remove({});
  });

  after(async ()=> {
    await db.dropDatabase();
    await db.close();
  });

  describe('Conversation model', ()=> {
    it('defines Conversation model',async()=>{
      expect(Conversation).not.to.be.undefined;
      })
    })

  describe('Saves message into DB',()=>{
    it('saves a record',async()=>{
     let message = new Conversation({between: 'messagetestuser_max',messages: [{from: 'max',to: 'messagetestuser',body: 'test body'}]})
     await message.save();
    expect(message.isNew).to.be.false;
    });

    it('validates between field  exists  before saving',async()=>{
     let message = new Conversation({messages: [{from: 'max',to: 'messagetestuser',body: 'test body'}]})
    await message.save()
    .catch(err => expect(err.message).to.match(/validation failed/));
    });

  });

});
