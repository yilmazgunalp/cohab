const User = require('../models/users');
const helper = require('../modules/helper');
const sessions = require('../modules/session');
const authorize = require('../modules/auth');

const signup = async (req,resp) => {
  console.log('inside the freaking login functuin')
  //get the body of the request and covert it to json
    let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
  // create a new user record
    console.log('before user model');
    let user = new User(userObject);
    console.log('after user model');
  // save the user record to database
    user.save().then((err,data)=> {
        if(err) console.log(err);
      console.log("user saved succefully");
      resp.end(JSON.stringify(user));
    });
};

//Uses middlewares: [auth.loginUser]
const login = (req,resp) => {
    console.log('calling userHandler.LOGIN');
    //if req.user property exists send it as json response
    //else return 401 
    if(req.user) {
    resp.setHeader('Content-Type', 'application/json');
    resp.end(JSON.stringify(req.user));
    } else {
    resp.statusCode = 401;   
    resp.end();
    }
};

const auth = async(req,resp)=> {
    if(req.user) {resp.end(req.user)}
    else {
       resp.end();
    }
};

const logout = (req,resp)=> {
    //get the seesion_id from the req.cookies
    let session_id = req.headers.cookie ? req.headers.cookie.split("=")[0] : null
    //if session_id exists set session
    //else send 409(Conflict) response
    if(session_id) {
    //delete the session cookie
    resp.setHeader('Set-Cookie',`${session_id}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    //remove the session from redis database then send response
    sessions.destroy(session_id).then(()=>resp.end("You have been logged out"));
    } else {
    resp.statusCode = 409;
    resp.end();
    }
};

//list of handlers for /user path
const handlers = {
    'POST': {signup,login},
    'GET': {auth,logout}
}

//returns the relavant handler based on HTTP method and path
const getHandler = (urlObject,method)=> {
    //find the second part of the path 
    let path = urlObject.pathname.match(/^\/[^\/]*\/([^\/]*)/)[1];
    //return the handler that corresponds to request method and path
    return handlers[method][path];
};

module.exports = (urlObject,method)=> {
    try {return getHandler(urlObject,method)}
    catch {return null};
}; 
