const sessions = require('./session');
const User = require('../models/users');
const helper = require('../modules/helper');

const authorizeUser = async(req,resp)=> {
        if(!req.headers.cookie) {
            req.user = null;}
        else {
        let session_id = req.headers.cookie.split("=")[0];
        console.log(session_id);
        let session =  await sessions.retrieve(session_id);
        console.log(session);
        resp.end("done");
        };
    };

const loginUser = async ({req,resp}) => {
  console.log('calling lohinuserr')
  //get the body of the request and covert it to json
    let userObject = await helper.getBody(req).then(formdata => helper.formToJson(formdata));
  //query database for user
    let user = await User.findOne({username:userObject.username});
  //create a session for the user
    await sessions.create({req,resp,user});
  //render view
    req.user = user;
    return {req,resp};
};


module.exports ={loginUser,authorizeUser};


