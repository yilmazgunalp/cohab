const assert = require('assert');

const User = require('../models/users');
describe('finding records',function() {
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
    it('find a record',function(done) {
        User.findOne({name:"yg"}).then(function(result){
            assert(result.name === 'yg');
        
    done();
})
   });


    it('finds a record by id',function(done){
        User.findOne({_id:user._id}).then(function(result){
            assert(result._id.toString() === user._id.toString());
            
    done();
})


})
});
