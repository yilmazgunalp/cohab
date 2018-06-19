const auth = require('./auth')
const logger = async ({req,resp})=> {
    if(resp.finished) return {req,resp};
        console.log('LOGGER');
 resp.setHeader('Tk','T');
    return {req,resp};
    };
const tester = async ({req,resp})=>{
    if(resp.finished) return {req,resp};
    console.log('TESTER');
    return new Promise(resolve => {
        
setTimeout(()=> {
   resolve({req,resp});
        },1000);
});
};
const drag = async ({req,resp})=> {
        console.log('DRAG');
 resp.setHeader('SourceMap','localhost.com');
    return {req,resp};
    };

//object that holds list of middlewares for each handler
const middlewares = {
    login: [auth.loginUser],
    home: [drag,tester,logger]
    
    };
//returns the list of middlewares to apply  for given handler
const getMw = (handler)=> {
        return middlewares[handler];
    }; 


module.exports = getMw;
