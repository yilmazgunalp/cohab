const {parse} = require("url");
let {createReadStream} = require("fs");

//root handler
const home = (req,resp)=> createReadStream("./frontend/views/home/home.html").pipe(resp);
//TEMP ROUTERS FOR STATIC ASSETS
const dist = (req,resp)=> createReadStream("./dist/index.bundle.js").pipe(resp);
const resetcss = (req,resp)=> createReadStream("./frontend/styles/reset.css").pipe(resp);

module.exports = function(req) {
  let path = parse(req.url).path;
  //log the request to console
  console.log(`${(new Date(Date.now()).toLocaleTimeString())} Received a HTTP ${req.method} request @ ${path}`);  
  // if root path requested return home handler
  if(path === '/' && req.method === 'GET') return home;
//TEMP SOLUTION UNTIL STATIC FILE SERVING IS FIXED
  if(/dist/.test(path)) return dist;
  if(/styles\/reset/.test(path)) return resetcss;
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
