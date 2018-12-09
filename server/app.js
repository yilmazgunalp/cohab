const {createServer} = require("http");
const {createReadStream } = require("fs");

// My Custom Router
const router = require("./modules/router");

// My Custom Middleware module
const applyMiddleWare = require('./modules/middleware')

const app = createServer((req,resp) => {
// get handler from Router Module
  let handler = router(req);

// if no handler is found return 404
  if(!handler) {
  resp.writeHead(404);
  createReadStream("./frontend/views/public/404.html").pipe(resp);
  } 
//else apply middleware to the handler
  else {
  applyMiddleWare({handler,req,resp});
  }  
})

module.exports = app;
