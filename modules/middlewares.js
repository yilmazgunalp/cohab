// This file contains the list of middlewares to be applied to each handler
// Middleware functions defined here or elsewhere must return a {req,resp} object.
// Update the middlwares object in this file,after you define a new middleware

const auth = require('./auth')

//object that holds list of middlewares for each handler
const middlewares = {
    login: [auth.loginUser],
    authenticate: [auth.authenticateUser]
};
    
//returns the list of middlewares to apply  for given handler
const getMw = (handler)=> {
    return middlewares[handler];
}; 

module.exports = getMw;
