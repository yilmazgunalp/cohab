const assert = require('assert');

const User = require('../models/users');
describe('updating records',function() {
let user;
beforeEach(function(done){

user = new User({
        name: "yg",
        email: 'y@gmail.com'
    })
        user.save().then(()=>{
            done();
        });
 

})

// create tests
    it('updates a record from db',function(done){
        User.findOneAndUpdate({ name:'yg'},{ name:'luigi'}).then(function(){ 
        User.findOne({ _id:user._id}).then(function(result){ 

            assert(result.name === 'luigi');
            done();
})
})
});

});
