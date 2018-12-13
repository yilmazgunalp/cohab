const net = require('net');
const {handleConnection} = require('./connection')

const server = net.createServer()

server.on('connection',handleConnection)

server.on('error', (err) => {
  console.error(err);
  throw err;
});

server.listen(4040, () => {
  console.log('server BOUND');
});

