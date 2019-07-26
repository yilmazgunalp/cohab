const sinon = require('sinon');
const chai = require('chai');
const config = require('../../config/config');

describe('Message endpoint tests', ()=>{
  let agent;

  before(async()=>{
    agent = require('supertest').agent(process.env.CHB_URL);
    })

  context('POST message/create endpoint test', ()=>{
    it('returns 200 for a valid request',async()=>{
      const message = {from: 'flower',to: 'beatrice', body: 'hello Arlo!!!' };
      let response;
    await agent.post('/message/create')
    .set('Accept', 'application/json')
    .send(message).chai.expect(200)
    .then(resp => response = JSON.parse(resp.text))
    chai.expect(response.messages[0].body).to.equal('hello Arlo!!!')
   }) 
 })

 context('GET message/getall endpoint test', ()=>{
   it('should return all messages',async()=> {
     await agent.post('/user/login').send({username: 'beatrice',password: '123456'}).then(() => agent.get('/message/getAll').chai.expect(200))
     .then(resp => (chai.expect(resp.body.length).to.equal(1)))
   })    
 })

 context('POST message/delete endpoint test', ()=>{
   // TODO
 })    
});
