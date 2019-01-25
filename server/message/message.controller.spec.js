const sinon = require('sinon');
import {expect} from 'chai';
let request = require('supertest');
const mongoose = require('mongoose');
const config = require('../config/config');
import app from '../app.js';
const Conversation = require('./message.js');
const User = require('../user/user');

mongoose.Promise = global.Promise;

describe('Message endpoint tests', ()=>{
  let sandbox;
  let agent;
  let user;
  let db;

  before(async()=>{
    await app.listen(3003)
    db = await mongoose.createConnection('mongodb://localhost/messagetestdb');
    request = request(app);
    agent = require('supertest').agent('http://localhost:3003');
   user =  await User.create({username: 'messagetestuser',email: 'messageusermeail@email.com',active: true})
   await user.setPassword('password');
   await user.save();
    })

  after(async()=>{
    await app.close();
    await Conversation.remove({})
    await User.remove({})
    await db.dropDatabase();
    await db.close();
    })
  
  context('POST message/create endpoint test', ()=>{
    it('returns 200 for a valid request',async()=>{
      const message = {from: 'Ruya',to: 'Arlo', body: 'hello Arlo!!!' };
      let response;
    await request.post('/message/create')
    .set('Accept', 'application/json')
    .send(message).expect(200)
    .then(resp => response = JSON.parse(resp.text))
    expect(response.messages[0].body).to.equal('hello Arlo!!!')
   }) 
 })

 context('GET message/getall endpoint test', ()=>{
   it('should return all messages',async()=> {
     let message = new Conversation({between: 'messagetestuser_max',messages: [{from: 'max',to: 'messagetestuser',body: 'test body'}]})
     await message.save();
     await agent.post('/user/login').send({username: user.username,password: 'password'}).then(() => agent.get('/message/getAll').expect(200))
     .then(resp => (expect(resp.body.length).to.equal(1)))
   })    
 })

 context('POST message/delete endpoint test', ()=>{
   // TODO
 })    
});
