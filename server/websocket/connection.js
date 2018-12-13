const net = require('net');
const crypto = require('crypto');
  let heaaad;

const sockets = new Set();
exports.handleConnection = (socket) => {
  socket.isNew = 
  console.log('client connected');
    
  socket.on('data',(data) => {heaaad  = (data.toString().split('\r\n')
      .slice(0,-2)
      .map(line => {
       let [k,v] = line.split(': ');
       return {[k]:  v};
      })
      .reduce((acc,cur)=> {
      acc[Object.keys(cur)[0]] = (Object.values(cur)[0]);
      return acc;
      },{}));
   if( sockets.has(socket.remoteAddress))
    {      console.log('Socket already connetcd') }
            else { 
                console.log('lets handshake')
             sockets.add(socket.remoteAddress);
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${SecWSHeader(heaaad['Sec-WebSocket-Key'])}\r\n` +
               '\r\n');
      };
})
  socket.on('end', () => {
   sockets.delete(socket.remoteAddress)
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
      socketData.toString().split('\r\n')
      .slice(0,-2)
      .map(line => {
       let [k,v] = line.split(': ');
       return {[k]:  v};
      })
      .reduce((acc,cur)=> {
      acc[Object.keys(cur)[0]] = (Object.values(cur)[0]);
      return acc;
      },{})
}
