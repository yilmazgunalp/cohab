const assert = require('assert');

const User = require('../models/users');
describe('some demo tests',function() {

//create tests

    it('saves a record',function(done) {
        let user = new User({
        name: "yg",
        email: 'y@gmail.com'
    })
        user.save().then(()=>{
            assert(user.isNew === false);
            done();
        });
    });


});
