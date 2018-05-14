const getMw = require('./middlewares');

const applyMiddleware = ({handler,req,resp})=> {
        //get the middlewares for handler
        let middlewares = getMw(handler.name);
        //if there is no mw call handler
        if(!middlewares || middlewares.length == 0 ) {
            handler(req,resp);
        }
        //else reduce over middlewares then call handler with resulting value
        else { 
        middlewares.reduce((accumulator,current)=>accumulator.then(current),
        Promise.resolve({req,resp})).then(val => handler(val.req,val.resp));
        };
    };

    module.exports = applyMiddleware;
