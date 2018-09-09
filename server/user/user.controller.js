const User = require('./user');
const util = require('../modules/util');
const sessions = require('../modules/session');
const nodemailer = require('../modules/nodemailer');
const UserService = require('./user.service')(User);

exports.GET = {
logout:        (req,resp)=> {
               //get the seesion_id from the req.cookies
               let session_id = req.headers.cookie ? util.cookiesToJson(req.headers.cookie).session_id : null
               //if session_id exists set expire session
               //else send 409(Conflict) response
               if(session_id) {
               //delete the session cookie
               resp.setHeader('Set-Cookie',`session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
               } else {
               resp.statusCode = 409;
               }
               resp.end();
               },
//handler for account activation after user signup
//Uses middlewares: [auth.activateUser]
activate:     async(req,resp) => {
              if(req.user) { 
              resp.writeHead(302, {Location: '/views/home/home.html'});
              return resp.end();
              } else {resp.end('Not Authorized...')}
              },
//handler for rendering password reset form
resetform:    async(req,resp)=> {
              //get the url params and find the user with 'id' param
              let params = util.qparams(req);
              let user = await User.findOne({_id: params.get('id')});
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
}

exports.POST = {
//Uses middlewares: [auth.authenticateUser]
authenticate:   async(req,resp)=> {
                if(req.user) {resp.end(req.user)}
                else { resp.end(); }
                },
//Uses middlewares: [auth.loginUser]
login:          (req,resp) => {
                //if req.user property exists send it as json response
                //else return 401 
                if(req.user) {
                    resp.setHeader('Content-Type', 'application/json');
                    resp.end(JSON.stringify(req.user));
                } else {
                    resp.statusCode = 401;   
                    resp.end(JSON.stringify({errorMessage: 'Invalid Credentials'}));
                }
                },
signup:        async(req,resp) => {
               //get the body of the request and covert it to json
               let userObject = await util.getBody(req).then(formdata => JSON.parse(formdata));
               UserService.create(userObject)
               .then(user=> {
                 console.log("user saved succefully");
                 nodemailer.sendMail(user,'Account Activation');
                 resp.end();
               })
               .catch(e => console.log(e));
               },
//handler for sending password reset e-mail
sendresetlink: async(req,resp)=> {
               //get the body of the request and covert it to json
               let userObject = await util.getBody(req).then(formdata => JSON.parse(formdata));
               let user = await UserService.setPasswordDigest(userObject);
               if(user) {
                 nodemailer.sendMail(user,'Reset-Pswd');
                 resp.end();
               } else {resp.writeHead(401,{'Content-Type': 'application/json'});resp.end(JSON.stringify({errorMessage: "Email address is not registered"}))}
               },
//handler for resetting user's password'
resetpswd:    async(req,resp)=> {
              //get the body of the request and covert it to json
              let userObject = await util.getBody(req).then(formdata => util.formToJson(formdata));
              let user = await UserService.resetPassword(userObject);
               console.log(userObject.password)
               if(user){
               sessions.create({req,resp,user});
               resp.writeHead(302, {Location: '/views/home/home.html'});
               resp.end();
               };
              },
//checks if a username already exists.Used by Signup Form
checkuser:  async(req,resp) => {
            //if a username exists return 418 else return 200
            //else return 401 
            let userObject = await util.getBody(req).then(formdata => JSON.parse(formdata));
            let user = await User.findOne(userObject)
            if(user) {
            resp.statusCode = 418;
            resp.end(JSON.stringify(JSON.stringify({errorMessage: 'Username already taken'})));
            } else {
              resp.statusCode = 200;   
            resp.end();
            }
            }
}
