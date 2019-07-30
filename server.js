const config = require('./server/config/config');
const app = require('./server/app');
const db = require('./db.js');

// to run Node in Cluster Mode
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//  if master fork workers.
if (cluster.isMaster) {

  console.log(`Master ${ process.pid} is running`);

  const mng = db.dbconnect(config.db, 3000,'master')
  .then(()=> {
  //  seed db for development
  if(config.seed) { require('./server/modules/seed.js')}
  });

  for (let i = 0; i < numCPUs; i++) {cluster.fork();}

  cluster.on('exit', (worker, code, signal) => console.log(`worker ${ worker.process.pid} died`));
} 
  // else create worker servers and start the app on each worker
else {
  console.log(`Worker No: ${ cluster.worker.id} with PID: ${process.pid} started a server`);

    db.dbconnect(config.db, 3000,cluster.worker.id)
    .then(()=> {
      app.listen(config.port);
      console.log(`Cohab started listening on port ${config.port} in ${config.env.toUpperCase()}`);
    });
}

