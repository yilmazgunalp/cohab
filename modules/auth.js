const sessions = require('./session');
const User = require('../models/users');
const helper = require('../modules/helper');

//******MIDDLEWARE FUNCTION******
//..see comments in modules/middlewares.js file for explanation...
const authorizeUser = async(req,resp)=> {
        resp = req.resp;
        req = req.req;
    
        if(!req.headers.cookie) { 
            req.user = null;
            return {req,resp};
        }
        else {
        let session_id = req.headers.cookie.split("=")[0];
        console.log(session_id);
        let user =  await sessions.retrieve(session_id);
        req.user = user['sub'];
        return {req,resp};
        };
    };

//******MIDDLEWARE FUNCTION******
//..see comments in modules/middlewares.js file for explanation...
const loginUser = async ({req,resp}) => {
  console.log('calling lohinuserr')
  //get the body of the request and covert it to json
    //let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
    let userObject = await helper.getBody(req).then(formdata => JSON.parse(formdata));
  //query database for user
    let user = await User.findOne({username:userObject.username});
  //create a session for the user
    await sessions.create({req,resp,user});
  // update request object with user property.
    req.user = user;
    return {req,resp};
};


module.exports ={loginUser,authorizeUser};


