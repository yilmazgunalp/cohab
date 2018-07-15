const {parse, URLSearchParams} = require("url");
// My Custom handler module
const gethandler = require("../handlers/handlers");

module.exports = function(req) {
  let path = parse(req.url).path;
  // find the handler for http request
  let handler = gethandler(path,req.method);
  //log the request to console
  console.log(`${(new Date(Date.now()).toLocaleTimeString())} Received a HTTP request @ ${path}`);  
  return handler; 
};
