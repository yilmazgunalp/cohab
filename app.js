const {createServer} = require("http");
const router = require("./router");
const {createReadStream } = require("fs");
const redis = require('redis').createClient('redis://redis');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log()
const applyMiddleWare = require('./modules/mw.js')

if (cluster.isMaster) {
  console.log(`Master ${ process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${ worker.process.pid} died`);
  });
} else {

// Workers can share any TCP connection
  // In this case it is an HTTP server

createServer((req,resp) => {

console.log(`Worker ${ cluster.worker.id} received request`);

let handler = router(req);

if(!handler) {
  resp.writeHead(404);
  createReadStream("./views/404.html").pipe(resp);
} else {
  applyMiddleWare({handler,req,resp});
  
}  
  
}).listen(3000);
console.log(`Worker ${ process.pid} started`);
}

console.log(`Cohab started listening on port 3000`);
