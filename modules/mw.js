const async applyMiddleware = ({handler,req,resp})=> {
        //get the middlewares for handler
        let middlewares = getMw(handler);
        //if there is no mw call handler
        if(!middlewares) handler(req,resp);
        //else iterate over middlewares passing {req,resp} to next one
        let result = {req,resp};
        middlewares.forEach((mw)=> {
                //if resp is already sent break
                if(resp.finished) break;
                //else pass {req,resp} to next middleware
                result = await mw(result);
                return;
            });
        //after all middlewares applied call handler
            handler(req,resp);
    };
