const {parse, URLSearchParams} = require("url");
const gethandler = require("./handlers");

module.exports = function(req) {
 
  let handler = gethandler(parse(req.url).path);
  console.log(`${(new Date(Date.now())).toLocaleTimeString()} Received a HTTP request @ ${parse(req.url).path}`);  
  let qparams = /\?(.*)$/.exec(parse(req.url).path);
  let params;
   if(qparams !== null) {
    params =  new URLSearchParams(qparams[1]); 
       
  }
  return {params,handler}; 
};