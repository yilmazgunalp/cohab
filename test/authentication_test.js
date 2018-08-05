const assert = require('assert');
const chai = require('chai');
const request = require('supertest');
const User = require('../models/users');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testdb");

let expect = chai.expect;

describe('Authentication tests', ()=>{
  let user;
  before(async()=>{
   user =  await User.create({username: 'authtestuser',email: 'authusermeail@email.com',active: true})
    })
  context('POST user/login test', ()=>{
    it('returns 401 for empty request',async()=>{
    await request('http://localhost:3000').post('/user/login').send({username: 'test',email: 'test'}).expect(401);
   }) 

    it('returns 200 for an active user ',async()=>{
    await request('http://localhost:3000').post('/user/login').send(user).expect(200);
   }) 
 })

});
