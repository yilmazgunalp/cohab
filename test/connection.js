const mongoose = require('mongoose');
const User = require('../models/users');
const chai = require('chai');
let expect = chai.expect;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/testdb");

  before(async () => {
    await User.remove({});
  });
    
  afterEach(async () => {
    await User.remove({});
  });

  after(async ()=> {
    await mongoose.connection.close();
  });


