const sessions = require('./session');
const User = require('../models/users');
const helper = require('../modules/helper');

//******MIDDLEWARE FUNCTION******
//..see comments in modules/middlewares.js file for explanation...
const authenticateUser = async(req,resp)=> {
    console.log('calling auth.AUTHENTICATEUSER')
    //this is for webpack devserver temporary solution
    resp = req.resp;
    req = req.req;
    //if request doesnt have session cookie set set req.user nul
    //else get the session id from cookie,find user & assign to req object
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
//expects a JSON string in request body
const loginUser = async ({req,resp}) => {
    console.log('calling auth.LOGINUSER')
    //get the body of the request and covert it to json
    let userObject = await helper.getBody(req).then(formdata => JSON.parse(formdata));
    //query database for user
    let user = await User.findOne({username:userObject.username});
    //create a session for the user if user is found
    // and password is correct
    if(user && user.validatePassword(userObject.password)) {
        await sessions.create({req,resp,user})
    };
    // update request object with user property.
    req.user = user;
    return {req,resp};
};


module.exports ={loginUser,authenticateUser};


