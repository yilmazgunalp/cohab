import ConversationService from './message.service';
import * as sinon from 'sinon';
import {expect} from 'chai';
describe('ConversationService', ()=>{
  let messageModel;
  let userModel;
  let messageService;
  let findOneStub = sinon.stub();

  before(()=> {
    userModel = {
      }
     messageModel = {
       find: sinon.spy(),
       findOne: findOneStub,
       create: sinon.spy()
     } 
     messageService = ConversationService(messageModel,userModel);
    // TODO learn how to spy on this
    //setBetweenKeySpy = sinon.spy(setBetweenKey)
  })

 context('Create method',()=>{
  describe('When no previous conversation exists', ()=>{
 it('creates a new conversation and adds the message to it',async()=>{
   let message = {from: 'Ruya',to: 'Arlo', body: 'hello Arlo!!!' };
    findOneStub.returns(Promise.resolve(null)) 
    await messageService.create(message);
    expect(messageModel.findOne.calledOnce).to.equal(true) 
    expect(messageModel.create.calledWith({between: 'arlo_ruya',messages: [message]})).to.be.true;
 }) 
 })
     
  describe('When a conversation exists', ()=>{
 it('adds the message to existing conversation',async()=>{
   let message = {from: 'Ruya',to: 'Arlo', body: 'hello Arlo!!!' };
   let conversation = {between: 'arlo_ruya',messages: []}
    findOneStub.returns(Promise.resolve(conversation)) 
    await messageService.create(message);
    expect(conversation.messages.length).to.equal(1);
 }) 
 }) 
 
 
 
 })
 
 
 
  
 context('Getall  method',()=>{
  describe('When no user is provided', ()=>{

  it('returns null', ()=>{
      let actual = messageService.getAll();
      let expected = null;
      expect(actual).to.equal(expected);
    })
    })
  describe('When a user is provided', ()=>{

  it('calls Conversation Models find method with users name', ()=>{
      messageService.getAll('flower');
      expect(messageModel.find.calledWith({between: new RegExp('flower')})).to.equal(true);
    })
    })
    })
  
  it.skip('Deletes a Conversation', ()=>{
    //TODO
    })
})
