const net = require('net');
const {websocket}  = require('./socket.js');

const server = net.createServer((c) => {
  console.log('client connected');
  c.on('data',(data) => console.log(data.toString()))
  c.on('end', () => {
  });
    console.log('client disconnected');
  c.write('hello\r\n');
});
server.on('error', (err) => {
  throw err;
});
server.listen(4040, () => {
  console.log('server bound');
});

server.on('upgrade',websocket)
