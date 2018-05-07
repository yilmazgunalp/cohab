const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//connect to db before test run


before(function(done){ 

    // Connect to mongodb
    mongoose.connect('mongodb://mongo/testaroo');
    mongoose.connection.once('open', function(){ 
        console.log('Connection has been made, now make fireworks...');
        done();
    }).on('error', function(error){ 
        console.log('Connection error:', error);
    });

});

// Drop the characters collection before each test
beforeEach(function(done){ 
    // Drop the collection
    mongoose.connection.collections.users.drop(function(){ 
        done();
    });
});
