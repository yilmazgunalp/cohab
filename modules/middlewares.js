// This file contains the middlewares to be applied to each handler
// Middleware functions defined here or elsewhere must return a {req,resp} object.
// Update the middlwares object in this file,after you define a new middleware

const auth = require('./auth')
const logger = async ({req,resp})=> {
    if(resp.finished) return {req,resp};
        console.log('LOGGER');
 resp.setHeader('Tk','T');
    return {req,resp};
    };
const tester = async ({req,resp})=>{
    if(resp.finished) return {req,resp};
    console.log('TESTER');
    return new Promise(resolve => {
        
setTimeout(()=> {
   resolve({req,resp});
        },1000);
});
};
const drag = async ({req,resp})=> {
        console.log('DRAG');
 resp.setHeader('SourceMap','localhost.com');
    return {req,resp};
    };

//object that holds list of middlewares for each handler
const middlewares = {
    login: [auth.loginUser],
    home: [drag,tester,logger]
    };
//returns the list of middlewares to apply  for given handler
const getMw = (handler)=> {
        return middlewares[handler];
    }; 


module.exports = getMw;
