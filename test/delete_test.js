const assert = require('assert');

const User = require('../models/users');
describe('Deleting records',function() {
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

    it('deletes a record from db',function(done){
        User.findOneAndRemove({ name:'yg'}).then(function(){ 
            User.findOne({ name:'yg'}).then(function(result){ 
                assert(result === null);

    done();
});

});
});



});
