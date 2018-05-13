const getMw = require('./middlewares');

const runMiddleware = async (mw,result)=> {
    return await new Promise(resolve => resolve(mw(result)));
    };

const applyMiddleware = async ({handler,req,resp})=> {
        //get the middlewares for handler
        let middlewares = getMw(handler.name);
        //if there is no mw call handler
        
        let promises = [];
        if(!middlewares || middlewares.length == 0 ) {
            handler(req,resp);
            return;
        }
        //else iterate over middlewares passing {req,resp} to next one
        else { 

        let result = {req,resp};
            middlewares.some((mw)=> {
                console.log(result);
                //if resp is already sent break
                if(resp.finished) return true;
                //else pass {req,resp} to next middleware
                result = await runMiddleware(mw,result);
            });
        //after applying all middlewares call handler
            return await handler(req,resp);

    };

        };

    module.exports = applyMiddleware;
