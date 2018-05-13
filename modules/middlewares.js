const auth = require('./auth')
const logger = ()=>console.log('I am a middlware');
const tester = async ({req,resp})=>{
    console.log('calling tester');
 resp.setHeader('Set-Cookie','ninjas=ruya-baba');
    return {req,resp};
};

//object that holds list of middlewares for each handler
const middlewares = {
    login: [auth.loginUser],
    home: []
    
    };
//returns the list of middlewares to apply  for given handler
const getMw = (handler)=> {
        return middlewares[handler];
    }; 


module.exports = getMw;
