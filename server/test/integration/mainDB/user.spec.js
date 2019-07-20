const assert = require('assert');
const chai = require('chai');
const User = require('../../../user/user');
const mongoose = require('mongoose');

let expect = chai.expect;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/usertestdb');

describe('User Model tests',()=>{

  before(async() => {
    await User.remove({});
  });
    
  afterEach(async () => {
    await User.remove({});
  });

  after(async ()=> {
    await mongoose.connection.close();
  });

describe('Saving record to database',()=>{
  it('saves a record',async()=>{
    let user = new User({ username: 'yg', email: 'y@gmail.com' })
    await user.save();
    assert(user.isNew === false);
    return;
    });

  context('Validating records on saving to database', ()=>{
    it('enforces unique validation on username',async()=>{
     let dup = [{ username: 'Val'}, { username: 'Val'}]; 
     let result = await User.create(dup).catch(e => e);
     let users = await User.find({username: 'Val'})
     expect(users.length).to.equal(1);
     expect(result).to.match(/duplicate key error/);
     })

    it('enforces unique validation on email',async()=>{
     let dup = [{ username: 'username1',email: 'email@user.com'}, { username: 'username2',email: 'email@user.com'}]; 
     let result = await User.create(dup).catch(e => e);
     let users = await User.find({email: 'email@user.com'})
     expect(users.length).to.equal(1);
     expect(result).to.match(/duplicate key error/);
     })
  });
});

describe('Finding records',()=>{
  let user;
  beforeEach( async() => {
    user = new User({ username: 'yg', email: 'y@gmail.com' })
    await user.save();
    return;
  });

  it('finds a record',async()=>{
    let result = await User.findOne({username:'yg'});
    assert(result.username === 'yg');
    });

  it('finds a record by id', async()=>{
    let result = await User.findOne({_id:user._id});
    assert(result._id.toString() === user._id.toString());
    });

  context('Deleting records',()=>{
    it('deletes a record from db',async()=>{
      await User.findOneAndRemove({ username:'yg'});
      let result = await User.findOne({ username:'yg'});
      assert(result === null);
    });
  });

  context('Updating records',()=>{
    it('updates a record from db',async()=>{
      await User.findOneAndUpdate({ username:'yg'},{username: 'luigi'});
      let result = await User.findOne({_id:user._id});
      assert(result.username === 'luigi');
    });
  });
});
});


