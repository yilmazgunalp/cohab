const assert = require('assert');
const chai = require('chai');
let request = require('supertest');
const User = require('./user');
const mongoose = require('mongoose');
const config = require('../config/config');
const sinon = require('sinon');
const nodemailer = require('../modules/nodemailer');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testdb');

let expect = chai.expect;

describe('Authentication tests', ()=>{
  let sandbox;
  request = request('http://localhost:3000');
  let agent;
  let user;
  let inactiveuser;

  beforeEach(()=>{
  agent = require('supertest').agent('http://localhost:3000');
  sandbox = sinon;
  })

  afterEach(()=>{
    sinon.restore();
  })

  before(async()=>{
   user =  await User.create({username: 'authtestuser',email: 'authusermeail@email.com',active: true})
   await user.setPassword('password');
   await user.save();

   inactiveuser =  await User.create({username: 'inactiveuser',email: 'inactiveuser@email.com'})
   await inactiveuser.setPassword('password');
   await inactiveuser.save();
    })
  
  context('POST user/login endpoint test', ()=>{
    it('returns 401 for empty request',async()=>{
    await request.post('/user/login').send({username: 'test',email: 'test'}).expect(401);
   }) 

    it('returns 200 for an active user ',async()=>{
    await request.post('/user/login').send({username: user.username,password: 'password'}).expect(200);
   }) 

    it('returns 401 for an inactive user ',async()=>{
    await request.post('/user/login').send({username: inactiveuser.username,password: 'password'}).expect(401);
   }) 
 })

 context('GET user/logout endpoint test', ()=>{
   it('should return 200 when a signed-in user logs out \n\tand should expire cookie immediately',async()=> {
     await agent.post('/user/login').send({username: user.username,password: 'password'})
     .then(()=> agent.get('/user/logout').expect(200))
     .then(resp => expect(resp.headers['set-cookie'][0]).to.match(/Thu, 01 Jan/))
     .then(()=> agent.get('/').expect(200))
     .then(res => expect(res.headers['set-cookie']).to.be.undefined);
   })    
 })

 context('POST user/authenticate endpoint test', ()=>{
   it('should return 200 and response should contain user\'s name for a signed-in user',async()=> {
     await agent.post('/user/login').send({username: user.username,password: 'password'})
     .then(()=> agent.post('/user/authenticate').expect(200))
     .then(res => expect(res.text).to.equal('authtestuser'));
   })    

   it('should return 200 and empty response body if user is not signed-in',async()=> {
     await agent.post('/user/login').send({username: inactiveuser.username,password: 'password'})
     .then(()=> agent.post('/user/authenticate').expect(200))
     .then(res => expect(res.text).to.be.empty)
   })    
 })    

 context.skip('POST user/signup endpoint test', ()=>{
   let newUser = {username: 'signupuser',email: 'signupuseremail@mail.com',password: 'password'};
   it('should return 200 and save user to db ',async()=> {
       let stub = sinon.spy(nodemailer,'sendMail');
     await agent.post('/user/signup').send(newUser).expect(200)
     .then(()=> User.findOne({username: 'signupuser'}))
     .then(user => {
       expect(user.email).to.equal('signupuseremail@mail.com');
       expect(user.active).to.be.false;
     });
   })    
     
     context('GET user/activate endpoint test',async()=>{
       it('activates user and logs the user in',async()=>{
       let toBeActivatedUser = await User.findOne({username: newUser.username});
          await agent.get(`/user/activate/?id=${toBeActivatedUser._id}&activationid=${toBeActivatedUser.activationDigest}`)   
          .expect(302)
          .expect('location','/views/home/home.html')
          .then(()=> agent.post('/user/authenticate'))
          .then(res => expect(res.text).to.equal('signupuser'));
       })         
    })
})    

context.skip('POST user/sendresetlink endpoint test', ()=>{
   let user;
   before(async()=>{
   user =  await User.create({username: 'resetuser',email: 'resetuser@email.com',active: true})
   await user.setPassword('password');
   await user.save();
   })

   it('should return 200 and update user with password reset digest',async()=> {
     expect(user.resetPswdDigest).to.be.undefined;
     await agent.post('/user/sendresetlink').send({email: user.email}).expect(200)
     .then(()=> User.findOne({email: user.email}))
     .then(user => expect(user.resetPswdDigest).to.not.be.undefined);
   })    

     context('GET user/resetform endpoint test',async()=>{
       it('should return 302 redirecting to pswd reset form \n\tshould add user\'s id in url parameters',async()=>{
       user = await User.findOne({username: user.username});
       let userId = new RegExp(user._id);
          await agent.get(`/user/resetform/?id=${user._id}&resetid=${user.resetPswdDigest}`)   
          .expect(302)
          .expect('location',/reset.html.*/)
          .expect('location',userId)
       })         
    })    

     context('POST user/resetpswd endpoint test',async()=>{
       it('should change user\'s password and return 302 redirecting to home page',async()=>{
         user = await User.findOne({username: user.username});
         expect(user.validatePassword('password')).to.be.true;
         agent.post('/user/resetpswd').send({user_id: user._id , password: 'newpassword'}).expect(302)
         .expect('location',/home.html/)
        .then(()=> User.findOne({username: user.username}))
        .then(user => expect(user.validatePassword('newpassword')).to.be.true)
         });
      });  
    });
});
