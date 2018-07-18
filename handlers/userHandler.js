const User = require('../models/users');
const helper = require('../modules/helper');
const sessions = require('../modules/session');
const nodemailer = require('../modules/nodemailer');

const signup = async (req,resp) => {
  console.log('calling userHandler.SIGNUP')
  //get the body of the request and covert it to json
  let userObject = await helper.getBody(req).then(formdata => JSON.parse(formdata));
  //create a new user record
  let user = new User({username: userObject.username, email: userObject.email});
  //hash the password before saving to database
  user.setPassword(userObject.password);
  //create an activation code and activation time
  user.setActivationDigest();
  user.set({activationSentAt: Date.now()})
  console.log(Date.now());
  // save the user record to database and send activation mail
  user.save().then((err,data)=> {
    if(err) console.log(err);
    console.log("user saved succefully");
    nodemailer(user,'Account Activation');
    resp.end();
  });
};

const activate = async(req,resp) => {
   //get the url params and find the user with 'id' param
   let params = helper.qparams(req);
   let user = await User.findOne({_id: params.get('id')});
   //check if user exists and activation code matches database
   if(user && user.activationDigest == params.get('activationid')) {
       //if activation code has expired return 401
       if((Date.now() - user.activationSentAt) > 1000*60*2) {
          resp.statusCode = 401;
          resp.end('token expired') ;
          return;
       }
      //else activate user and redirect to home page
      user.set({active: true});
      user.save();
      console.log("user activated succefully");
      resp.writeHead(302, {Location: '/'});
      resp.end();
   } else {
     resp.statusCode = 401;
     resp.end('not Authorized');
   }
}

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
    resp.end(JSON.stringify({errorMessage: 'Invalid Credentials'}));
    }
};

//Uses middlewares: [auth.authenticateUser]
const auth = async(req,resp)=> {
    console.log('calling userHandler.AUTH');
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
    'POST': {signup,login,auth},
    'GET': {logout,activate}
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
