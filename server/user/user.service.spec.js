const chai = require('chai');
const sinon = require('sinon');
const UserService = require('./user.service');
let expect = chai.expect;


describe('User Service Tests',()=>{
    
  beforeEach(()=>{
    
  })
    it('Creates User',()=>{
      const methods = {
       save: sinon.spy(),
       setPassword: sinon.spy(),
       setActivationDigest: sinon.spy(),
       set: sinon.spy(),
      }
      let username;
      let email;
      let password;

      const MockModel = function(data) {
        username = data.username;
        email = data.email;
        password = data.password;

        return {
          ...data,
          ...methods    
        }
      }
      
      const MockService = UserService(MockModel);
      MockService.create({username: 'testuser',email: 'testemeail',password: 'password'})
      expect(methods.save.calledOnce).to.be.true;
      expect(username).to.equal('testuser');
      expect(methods.setPassword.calledWith('password')).to.be.true;
   }) 

})
