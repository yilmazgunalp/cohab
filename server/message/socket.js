//const net = require('net');
//const server = net.createServer((c) => {
  // 'connection' listener
//  console.log('client connected');
//  console.log(c)
//  c.on('end', () => {
//    console.log('client disconnected');
//  });
//  c.write('hello\r\n');
//  c.pipe(c);
//});
//server.on('error', (err) => {
//  console.log(err)
//});
//server.listen(8824, () => {
//  console.log('server bound');
//});

const crypto = require('crypto');
exports.websocket = (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${SecWSHeader(req.headers['sec-websocket-key'])}\r\n` +
               '\r\n');

socket.write(Buffer.from([0x80,0x00,0x00,0x00,0x09,0x00]));
  socket.on('data',(data,start,end) => {
      var message = data.slice(start, end);
  var FIN = (message[0] & 0x80);
  var RSV1 = (message[0] & 0x40);
  var RSV2 = (message[0] & 0x20);
  var RSV3 = (message[0] & 0x10);
  var Opcode = message[0] & 0x0F;
  var mask = (message[1] & 0x80);
  var length = (message[1] & 0x7F);

  var nextByte = 2;
  if (length === 126) {
    // length = next 2 bytes
    nextByte += 2;
  } else if (length === 127){
    // length = next 8 bytes
    nextByte += 8;
  }

  var maskingKey = null;
  if (mask){
    maskingKey = message.slice(nextByte, nextByte + 4);
    nextByte += 4;
  }

  var payload = message.slice(nextByte, nextByte + length);

  if (maskingKey){
    for (var i = 0; i < payload.length; i++){
      payload[i] = payload[i] ^ maskingKey[i % 4];
    }
  }

  console.log(payload.toString()); 
});
}

const SecWSHeader = header => {
		const hash = crypto.createHash('sha1');
    hash.update(header + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    return (hash.digest('base64'));
}
