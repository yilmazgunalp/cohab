const User = require('../models/users');
const helper = require('../modules/helper');
const sessions = require('../modules/session');
const signup = async (req,resp) => {
  //get the body of the request and covert it to json
    let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
  // create a new user record
    let user = new User(userObject);
  // save the user record to database
    user.save().then((err,data)=> {
        if(err) console.log(err);
      console.log("user saved succefully");
      resp.end(JSON.stringify(user));
    });
};

const login = async (req,resp) => {
  //get the body of the request and covert it to json
    let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
  //query database for user
    let user = await User.findOne({username:userObject.username});
  //create a session for the user
    console.log("user");
    sessions.create({req,resp,user});
  //render view
resp.end(user.toString());
};


const auth = async(req,resp)=> {
        let session_id = req.headers.cookie.split("=")[0];
        console.log(session_id);
        let session =  await sessions.retrieve(session_id);
        console.log(session);
        resp.end("done");
    };
const handlers = {
  'POST': {signup,login},
  'GET': {auth}
}

const getHandler = (urlObject,method)=> {
    let path = urlObject.pathname.match(/^\/[^\/]*\/([^\/]*)/)[1];
    return handlers[method][path];
    };
module.exports = (urlObject,method)=> {
    try {return getHandler(urlObject,method)}
  catch {
      return null; 
    };
 }; 
