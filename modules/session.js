const jwt = require('./jwt');
const crypto = require('crypto');
const redis = require('redis').createClient('redis://redis');

const create = ({req,resp,user}) => {
  //create a JWT token 
  let token = jwt.createJWT(user);
  //set Cookie for JWT token
  let session_id = jwt.base64UrlEncode(crypto.randomBytes(16).toString('base64'));
  resp.setHeader('Set-Cookie',`${session_id}=${token}`);
  //store session in redis 
  //NO NEED TO STORE SESSION IN REDIS SINCE USING JWT
  //redis.set(session_id,token,(err,data)=> {
    //console.log(`Session with id ${session_id} saved in redis`);
  //});
};

const retrieve = (session_id)=> {
    return new Promise((resolve,reject) => {
 redis.get(session_id,(err,data) => {
            if(err) console.log(err);
            resolve(jwt.verifyToken(data));
        });
        }).catch(e => console.log('COULD NOT RETRIEVE SESSION FROM REDIS',e));
    };


const destroy = (session_id)=> {
    return new Promise((resolve,reject) => {
 redis.del(session_id,(err,data) => {
            if(err) console.log(err);
            console.log(data);
            resolve(data);
        });
    
        });

    };
module.exports = {create,retrieve,destroy};

