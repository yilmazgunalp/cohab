const config = require('./server/config/config');
const app = require('./server/app');
const mongoose = require('mongoose');
mongoose.connect(config.db);

// to run Node in Cluster Mode
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//  if master fork workers.
if (cluster.isMaster) {
require('./server/websocket/server.js')
  //seed db for development
  if(config.seed) { require('./server/modules/seed.js')}
  console.log(`Master ${ process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${ worker.process.pid} died`);
  });
} 
  // else create worker servers
else {
  console.log(`Worker No: ${ cluster.worker.id} with PID: ${process.pid} started a server`);
  app.listen(config.port);
}

console.log(`Cohab started listening on port 3000 in ${config.env.toUpperCase()}`);
