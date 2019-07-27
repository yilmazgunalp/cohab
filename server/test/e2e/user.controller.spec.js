const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');
const config = require('../../config/config');

let expect = chai.expect;

describe('User endpoint tests', ()=>{
  let sandbox;
  let agent;

  beforeEach(async()=>{
    agent = require('supertest').agent(process.env.CHB_URL);
    sandbox = sinon;
  })

  afterEach(async()=>{
    sinon.restore();
  })

  
  context('POST user/login endpoint test', ()=>{
    it('returns 401 for empty request',async()=>{
    await agent.post('/user/login').send({username: 'test',email: 'test'}).expect(401);
   }) 

    it('returns 200 for an active user ',async()=>{
    await agent.post('/user/login').send({username:'fedji',password: '123456'}).expect(200);
   }) 

    it('returns 401 for an inactive user ',async()=>{
    await agent.post('/user/login').send({username: 'moonshine',password: '123456'}).expect(401);
   }) 
 })

 context('GET user/logout endpoint test', ()=>{
   it('should return 200 when a signed-in user logs out \n\tand should expire cookie immediately',async()=> {
     await agent.post('/user/login').send({username: 'ruby',password: '123456'})
     .then(()=> agent.get('/user/logout').expect(200))
     .then(resp => expect(resp.headers['set-cookie'][0]).to.match(/Thu, 01 Jan/))
     .then(()=> agent.get('/').expect(200))
     .then(res => expect(res.headers['set-cookie']).to.be.undefined);
   })    
 })

 context('POST user/authenticate endpoint test', ()=>{
   it('should return 200 and response should contain user\'s name for a signed-in user',async()=> {
     const expected = '"max"'; //so weird
     await agent.post('/user/login').send({username: 'max',password: '123456'})
     .then(()=> agent.post('/user/authenticate').expect(200))
     .then(res => expect(res.text).to.equal(expected));
   })    

   it('should return 200 and empty response body if user is not signed-in',async()=> {
     await agent.post('/user/login').send({username: 'moonshine',password: '123456'})
     .then(()=> agent.post('/user/authenticate').expect(200))
     .then(res => expect(res.text).to.be.empty)
   })    
 })    

 context('POST user/signup endpoint test', ()=>{
   let newUser = {username: 'signupuser',email: 'signupuseremail@mail.com',password: 'password'};
   it.skip('should return 200 and save user to db ',async()=> {
     await agent.post('/user/signup').send(newUser).expect(200)
   })    
     
     context('GET user/activate endpoint test',async()=>{
       it('activates user and logs the user in',async()=>{
          await agent.get(`/user/activate/?id=buttonidhast&activationid=button_test_digest`)   
          .expect(302)
          .expect('location','/views/home/home.html')
          .then(()=> agent.post('/user/authenticate'))
          .then(res => expect(res.text).to.equal('"button"'));
       })         
    })
})    

context('POST user/sendresetlink endpoint test', ()=>{

   it('should return 200 and update user with password reset digest',async()=> {
     await agent.post('/user/sendresetlink').send({email: 'olaf@test.com'}).expect(200)
   })    

     context('GET user/resetform endpoint test',async()=>{
       it.skip('should return 302 redirecting to pswd reset form \n\tshould add user\'s id in url parameters',async()=>{
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
         agent.post('/user/resetpswd').send({user_id: 'buttonidhast' , password: 'newpassword'}).expect(302)
         .expect('location',/home.html/)
         });
      });  
    });
});
