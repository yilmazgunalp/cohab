import EventService from './event.service';
import * as sinon from 'sinon';
import {expect} from 'chai';

describe('EventService', ()=>{
  let eventModel;
  let userModel;
  let eventService;

  before(()=> {
    userModel = {
     findOne: sinon.stub().returns(Promise.resolve({}))
      }
     eventModel = {
       find: sinon.stub().returns({populate: sinon.stub()}),
       create: sinon.stub(),
       deleteOne: sinon.stub().returns({exec: sinon.stub})
     } 
     eventService = EventService(eventModel,userModel);
  })

 it('creates an event',(done)=>{
    eventService.create({postedBy: 'testusername'});
    userModel.findOne()
    .then()
    .then(_ =>{ 
      expect(eventModel.create.calledOnce).to.equal(false);
      done()
    })
    .catch(_ => done());
    expect(userModel.findOne.calledWith({username: 'testusername'})).to.equal(true);
   
 }) 
  
  it('gets All Events', ()=>{
      eventService.getAll();
      expect(eventModel.find.calledOnce).to.equal(true);
    })
  
  it('Deletes an event', ()=>{
      eventService.delete('eventId');
      expect(eventModel.deleteOne.calledOnce).to.equal(true);
      expect(eventModel.deleteOne.calledWith({_id: 'eventId'})).to.equal(true);
    })
})
