const config = require('../config/config');
const sinon = require('sinon');
import {expect} from 'chai';

describe('Event endpoint tests', ()=>{
  let sandbox;
  let agent;

  beforeEach(()=>{
  agent = require('supertest').agent('http://localhost:3000');
  })

  afterEach(()=>{
    sinon.restore();
  })

  before(async()=>{

    })
  
  context.skip('POST event/login endpoint test', ()=>{
    it('returns 401 for empty request',async()=>{
    await request.post('/event/login').send({eventname: 'test',email: 'test'}).expect(401);
   }) 

    it('returns 200 for an active event ',async()=>{
    await request.post('/event/login').send({eventname: event.eventname,password: 'password'}).expect(200);
   }) 

    it('returns 401 for an inactive event ',async()=>{
    await request.post('/event/login').send({eventname: inactiveevent.eventname,password: 'password'}).expect(401);
   }) 
 })

 context('GET event/getall endpoint test', ()=>{
   it('should return all events',async()=> {
     await agent.get('/event/getAll').expect(200)
     .then(resp => console.log(resp.body))
   })    
 })

 context.skip('POST event/authenticate endpoint test', ()=>{
   it('should return 200 and response should contain event\'s name for a signed-in event',async()=> {
     await agent.post('/event/login').send({eventname: event.eventname,password: 'password'})
     .then(()=> agent.post('/event/authenticate').expect(200))
     .then(res => expect(res.text).to.equal('authtestevent'));
   })    

   it('should return 200 and empty response body if event is not signed-in',async()=> {
     await agent.post('/event/login').send({eventname: inactiveevent.eventname,password: 'password'})
     .then(()=> agent.post('/event/authenticate').expect(200))
     .then(res => expect(res.text).to.be.empty)
   })    
 })    

});
