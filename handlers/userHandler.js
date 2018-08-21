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

//handler for account activation after user signup
const activate = async(req,resp) => {
  //get the url params and find the user with 'id' param
  let params = helper.qparams(req);
  let user = await User.findOne({_id: params.get('id')});
  //check if user exists and activation code matches database
  if(user && user.activationDigest == params.get('activationid')) {
    //if activation code has expired return 401
    if((Date.now() - user.activationSentAt) > 1000*60*25) {
         resp.statusCode = 401;
         resp.end('token expired') ;
         return;
    }
     //else activate user, create session and redirect to home page
     user.set({active: true});
     user.save();
     console.log("user activated succefully");
     sessions.create({req,resp,user});
     resp.writeHead(302, {Location: '/home.html'});
     resp.end();
   } else {
     console.log('inside else')
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
const authenticate = async(req,resp)=> {
  console.log('calling userHandler.AUTH');
  if(req.user) {resp.end(req.user)}
  else {
     resp.end();
    }
};

const logout = (req,resp)=> {
  //get the seesion_id from the req.cookies
  let session_id = req.headers.cookie ? helper.cookiesToJson(req.headers.cookie).session_id : null
  //if session_id exists set expire session
  //else send 409(Conflict) response
  if(session_id) {
  //delete the session cookie
  resp.setHeader('Set-Cookie',`session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  } else {
  resp.statusCode = 409;
  }
  resp.end();
};

//handler for rendering password reset form
const resetform = async(req,resp)=> {
  //get the url params and find the user with 'id' param
  let params = helper.qparams(req);
  let user = await User.findOne({_id: params.get('id')});
  console.log(user);
  //check if user exists and activation code matches database
  if(user && user.resetPswdDigest == params.get('resetid')) {
    //if activation code has expired return 401
    if((Date.now() - user.resetPswdSentAt) > 1000*60*120) {
         resp.statusCode = 401;
         resp.end('token expired') ;
         return;
    }
     //else serve the password reset form
      resp.writeHead(302, {Location: `/views/reset/reset.html?id=${params.get('id')}`});
      resp.end();
    }
}

//handler for sending password reset e-mail
const sendresetlink = async(req,resp)=> {
  console.log('calling USER.SENDRESETLINK')
  //get the body of the request and covert it to json
  let userObject = await helper.getBody(req).then(formdata => JSON.parse(formdata));
  console.log(userObject)
  //query database for user
  let user = await User.findOne({email:userObject.email});
  //set resetPswddigest and send reset-email
  if(user ) {
    user.setResetPswdDigest();
    user.set({resetPswdSentAt: Date.now()})
    user.save();
    nodemailer(user,'Reset-Pswd');
    resp.end();
  } else {resp.end('This e-mail is not registered!')}
}

//handler for resetting user's password'
const resetpswd = async(req,resp)=> {
  console.log('calling USER.RESETPSWD')
  //get the body of the request and covert it to json
  let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
  //find the user with the id from the hidden field in the form
  let user = await User.findOne({_id: userObject.user_id});
  console.log(userObject);
  //set user's password
  user.setPassword(userObject.password);
  //save user, create session and redirect to home page
  user.save().then((err,data)=> {
    if(err) console.log(err);
    sessions.create({req,resp,user});
    resp.writeHead(302, {Location: '/views/home/home.html'});
    resp.end();
  });
}


//list of handlers for /user path
const handlers = {
  'POST': {signup,login,authenticate,sendresetlink,resetpswd},
  'GET': {logout,activate,resetform}
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
