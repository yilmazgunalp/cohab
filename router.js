const {parse, URLSearchParams} = require("url");
const gethandler = require("./handlers/handlers");

module.exports = function(req) {
  let path = parse(req.url).path;
  let handler = gethandler(path);
  console.log(`${(new Date(Date.now()).toLocaleTimeString())} Received a HTTP request @ ${path}`);  
  return handler; 
};
