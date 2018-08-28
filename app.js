const {createServer} = require("http");
const {createReadStream } = require("fs");
const redis = require('redis').createClient('redis://redis');
const config = require('./config/config');
// to run Node in Cluster Mode
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// My Custom Router
const router = require("./modules/router");

// My Custom Middleware module
const applyMiddleWare = require('./modules/mw.js')

//seed db for development
//Server Code
if (cluster.isMaster) {
  if(config.seed) { require('./modules/seed.js')}
  console.log(`Master ${ process.pid} is running`);
  //  if master? fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${ worker.process.pid} died`);
  });
} 
  // else create worker servers
else {
createServer((req,resp) => {
console.log(`Worker ${ cluster.worker.id} received request`);

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
  
}).listen(config.port);
console.log(`Worker ${ process.pid} started`);
}

console.log(`Cohab started listening on port 3000 in ${config.env.toUpperCase()}`);
