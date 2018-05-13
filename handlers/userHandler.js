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

const login = (req,resp) => {
  console.log('caling LOGIN');
  //render view
resp.end(req.user);
};


const auth = async(req,resp)=> {
        let session_id = req.headers.cookie.split("=")[0];
        console.log(session_id);
        let session =  await sessions.retrieve(session_id);
        console.log(session);
        resp.end("done");
    };


const logout = (req,resp)=> {

        let session_id = req.headers.cookie.split("=")[0];
        resp.setHeader('Set-Cookie',`${session_id}=; ;Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        sessions.destroy(session_id).then(()=>resp.end("You have been logged out"));
    };
const handlers = {
  'POST': {signup,login},
  'GET': {auth,logout}
}

const getHandler = (urlObject,method)=> {
    //find the second part of the path 
    let path = urlObject.pathname.match(/^\/[^\/]*\/([^\/]*)/)[1];
    //return the handler that corresponds to request method and path
    return handlers[method][path];
    };


module.exports = (urlObject,method)=> {
    try {return getHandler(urlObject,method)}
  catch {
      return null; 
    };
 }; 
