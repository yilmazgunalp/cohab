const jwt = require('./jwt');
const crypto = require('crypto');
const redis = require('redis').createClient('redis://redis');

const create = ({req,resp,user}) => {
  //create a JWT token 
     let token = jwt.createJWT(user);
  //set Cookie for JWT token
  let session_id = jwt.base64UrlEncode(crypto.randomBytes(16).toString('base64'));
    resp.setHeader('Set-Cookie',[`${session_id}=${token}`]);
  //store session in redis 
let x;
redis.set(session_id,token,(err,data)=> {
        console.log(data);
    });
};

const retrieve = (session_id)=> {
    return new Promise((resolve,reject) => {
 redis.get(session_id,(err,data) => {
            if(err) console.log(err);
            resolve(data);
        });
    
        });
    };


module.exports = {create,retrieve}
