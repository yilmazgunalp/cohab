// This file contains the list of middlewares to be applied to each handler
// Middleware functions defined here or elsewhere must return a {req,resp} object.
// Update the middlwares object in this file after you define a new middleware

const auth = require('./auth')

//object that holds list of middlewares for each handler
const middlewareList = {
    login: [auth.loginUser],
    authenticate: [auth.authenticateUser],
    //TODO getAll is defined in multiple places!!!!!
    getAll: [auth.authenticateUser],
    activate: [auth.activateUser]
};
    
const applyMiddleware = ({handler,req,resp})=> {
        //get the middlewares for handler
        let middlewares = middlewareList[handler.name];
        //if there is no mw call handler
        if(!middlewares || middlewares.length == 0 ) {
            handler(req,resp);
        }
        //else reduce over middlewares then call handler with resulting value
        else { 
        middlewares.reduce((accumulator,current)=>accumulator.then(current),
        Promise.resolve({req,resp})).then(val => {
          console.log('calling',handler.name.toUpperCase());
          handler(val.req,val.resp);
          });
        };
    };

module.exports = applyMiddleware;
