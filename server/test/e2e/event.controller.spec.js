const sinon = require('sinon');
const chai = require('chai');
const config = require('../../config/config');

describe('Event endpoint tests', ()=>{
  let agent;
  before(async()=>{
    agent = require('supertest').agent(process.env.CHB_URL);
    })

  context('POST event/create endpoint test', ()=>{
    it('returns 200 for a valid request',async()=>{
      const event = {name: 'test',place: 'testplace', description: 'some description',email: 'test',
        placeID: 'somePlaceId', startTime: new Date(), endTime: new Date()};
      let response;
    await agent.post('/event/create')
    .set('Accept', 'application/json')
    .send(event).expect(200)
    .then(resp => response = JSON.parse(resp.text))
    chai.expect(response.description).to.equal('some description')
   }) 
 })

 context('GET event/getall endpoint test', ()=>{
   it('should return all events',async()=> {
     await agent.get('/event/getAll').expect(200)
     .then(resp => (chai.expect(resp.body.length).to.equal(11)))
   })    
 })

 context('POST event/delete endpoint test', ()=>{
   it('should return 200 and delete the event',async()=> {
     const event = await agent.get('/event/getAll')
     .then(resp => resp.body[10])
     await agent.post('/event/delete').send(event)
     .expect(200)
   })    
 })    
});
