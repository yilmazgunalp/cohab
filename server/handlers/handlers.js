let { createReadStream} = require("fs");
const helper = require("../modules/helper");
const {URL,parse} = require("url");

const base = 'http://localhost:5000';

//root handler
const home = (req,resp) => {
  createReadStream("./frontend/views/home/home.html").pipe(resp);
};


module.exports = function(path,method) {
  // if root path requested return home handler
  if(path === '/' && method === 'GET') return home;
    let url = new URL(base+path);

  // ADD STATIC FILES HANDLER HERE!!!!!
     // if(path === '/dist/' && method === 'GET') return static;
    
    try {
    // get the first path of the url then return the corresonding handler module  from handlers directory
    return require('./'+helper.basePath(path)+'Handler')(url,method);
        }
    catch(error) { 
       console.log(error);
        return null; }
};


