const assert = require('assert');
const chai = require('chai');
let request = require('supertest');
const User = require('../models/users');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testdb");

let expect = chai.expect;

describe('Authentication tests', ()=>{
let agent = request.agent('http://localhost:3000');
request = request('http://localhost:3000');
  let user;
  before(async()=>{
   user =  await User.create({username: 'authtestuser',email: 'authusermeail@email.com',active: true})
   await user.setPassword('password');
   await user.save();
    })
  context('POST user/login test', ()=>{
    it('returns 401 for empty request',async()=>{
    await request.post('/user/login').send({username: 'test',email: 'test'}).expect(401);
   }) 

    it('returns 200 for an active user ',async()=>{
    await request.post('/user/login').send({username: user.username,password: 'password'}).expect(200);
   }) 
 })

 context('GET user/logout endpoint test', ()=>{
   it('should return 200 when a signed-in user logs out and \n\t expires cookie immediately',async()=> {
     await agent.post('/user/login').send({username: user.username,password: 'password'})
     .then(()=> agent.get('/user/logout').expect(200))
     .then(resp => expect(resp.headers['set-cookie'][0]).to.match(/Thu, 01 Jan/))
     .then(()=> agent.get('/').expect('cookies').to.be.undefined);
   })    
     
 })

});
