const {parse} = require("url");
let {createReadStream} = require("fs");

//root handler
const home = (req,resp) => {
  createReadStream("./frontend/views/home/home.html").pipe(resp);
};

module.exports = function(req) {
  let path = parse(req.url).path;
  //log the request to console
  console.log(`${(new Date(Date.now()).toLocaleTimeString())} Received a HTTP ${req.method} request @ ${path}`);  
  // if root path requested return home handler
  if(path === '/' && req.method === 'GET') return home;
  // find the handler for http request
  try {
    let rootPath = 	path.match(/^\/([^\/]*)\/([^\/]*)/)[1];
    let subPath = 	path.match(/^\/([^\/]*)\/([^\/]*)/)[2];
    let handler = require(`../${rootPath}/${rootPath}.controller`)[req.method][subPath];
    return handler; }
  catch(error) { 
    console.log(error);
    return null; }
};
