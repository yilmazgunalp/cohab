const sessions = require('./session');
const User = require('../user/user');
const util = require('../modules/util');
const nodemailer = require('../modules/nodemailer');

//******MIDDLEWARE FUNCTION******
//..see comments in modules/middleware.js file for explanation...
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
  let session_id = util.cookiesToJson(req.headers.cookie).session_id;
  let user =  await sessions.retrieve(session_id);
  req.user = user['sub'];
  return {req,resp};
  };
};

//******MIDDLEWARE FUNCTION******
//..see comments in modules/middleware.js file for explanation...
//expects a JSON string in request body
const loginUser = async ({req,resp}) => {
  console.log('calling auth.LOGINUSER')
  //get the body of the request and covert it to json
  let userObject = await util.getBody(req).then(formdata => JSON.parse(formdata));
  //query database for user
  let user = await User.findOne({username:userObject.username});
  //create a session for the user if user is found
  // and password is correct and user is activated
  if(user && user.validatePassword(userObject.password) && user.active) {
      sessions.create({req,resp,user});
  // update request object with user property.
      req.user = user;
  } else {req.user = null}
  return {req,resp};
};


//******MIDDLEWARE FUNCTION******
//..see comments in modules/middleware.js file for explanation...
const activateUser = async({req,resp}) => {
  //get the url params and find the user with 'id' param
  let params = util.qparams(req);
  let user = await User.findOne({_id: params.get('id')});
  //check if user exists and activation code matches database
  if(user && user.activationDigest == params.get('activationid')) {
  //if activation code has expired return 401
  if((Date.now() - user.activationSentAt) > 1000*60*25) {
  resp.statusCode = 401;
  return {req,resp};
  }
  //else activate user, create session and redirect to home page
  user.set({active: true});
  await user.save();
  sessions.create({req,resp,user});
  req.user = user;
  return {req,resp};
  } else {
  resp.statusCode = 401;
  return {req,resp};
  }
}

module.exports ={loginUser,authenticateUser,activateUser};


