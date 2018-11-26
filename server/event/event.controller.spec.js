const sinon = require('sinon');
import {expect} from 'chai';
let request = require('supertest');
const mongoose = require('mongoose');
const config = require('../config/config');
import app from '../app.js';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eventtestdb');

describe('Event endpoint tests', ()=>{
  let sandbox;
  let agent;

  before(async()=>{
    await app.listen(3003)
    request = request(app);
    agent = require('supertest').agent('http://localhost:3003');
    })

  after(async()=>{
    await app.close();
    })
  
  context('POST event/create endpoint test', ()=>{
    it('returns 200 for a valid request',async()=>{
      const event = {name: 'test',place: 'testplace', description: 'some description',email: 'test',
        placeID: 'somePlaceId', startTime: new Date(), endTime: new Date()};
      let response;
    await request.post('/event/create')
    .set('Accept', 'application/json')
    .send(event).expect(200)
    .then(resp => response = JSON.parse(resp.text))
    expect(response.description).to.equal('some description')
   }) 
 })

 context('GET event/getall endpoint test', ()=>{
   it('should return all events',async()=> {
     await agent.get('/event/getAll').expect(200)
     .then(resp => (expect(resp.body.length).to.equal(1)))
   })    
 })

 context('POST event/delete endpoint test', ()=>{
   it('should return 200 and delete the event',async()=> {
     const event = await agent.get('/event/getAll')
     .then(resp => resp.body[0])
     await agent.post('/event/delete').send(event)
     .expect(200)
   })    
 })    
});
