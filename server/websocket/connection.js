const net = require('net');
const crypto = require('crypto');
const {readFrame} = require('./reader.js')
const {createFrame} = require('./writer.js')

const clients = new Set();
let counter = 0;

exports.handleConnection = (socket) => {
  console.log('client connected');
  socket.isNew = true;
  console.log(++counter)
  socket.on('data',(data) => {   
    if(socket.isNew) {
      console.log('lets handshake')
      let head = readHttpHeader(data);
      handShake(socket,head);
      socket.isNew = false;
      console.log('after handshake')
    }
    else { 
      console.log('Socket already connected') 
      readFrame(data);
      socket.write(createFrame('You are not the devil.just a practise'));
    };
  })

  socket.on('close', (hadError) => {
   console.log('socket closed',hadError)
  });
  socket.on('end', () => {
   console.log('socket ended')
  });
}

// String -> String
const SecWSAcceptHeader = SecWSKey => {
		const hash = crypto.createHash('sha1');
    hash.update(SecWSKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    return (hash.digest('base64'));
}

// Hex -> Object
const readHttpHeader = socketData =>{
      return socketData.toString().split('\r\n')
      .slice(0,-2)
      .map(line => {
       let [k,v] = line.split(': ');
       return {[k]:  v};
      })
      .reduce((acc,cur)=> {
      acc[Object.keys(cur)[0]] = (Object.values(cur)[0]);
      return acc;
      },{});
}

// TODO this is not pure needs refactoring
const handShake = (socket,head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${SecWSAcceptHeader(head['Sec-WebSocket-Key'])}\r\n` +
               '\r\n');
}


