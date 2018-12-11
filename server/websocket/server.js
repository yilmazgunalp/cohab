const net = require('net');
const crypto = require('crypto');

const server = net.createServer((c) => {
  console.log('client connected');
  let heaaad;
  c.on('data',(data) => {heaaad  = (data.toString().split('\r\n')
      .slice(0,-2)
      .map(line => {
       let [k,v] = line.split(': ');
       return {[k]:  v};
      })
      .reduce((acc,cur)=> {
      acc[Object.keys(cur)[0]] = (Object.values(cur)[0]);
      return acc;
      },{}));
  c.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${SecWSHeader(heaaad['Sec-WebSocket-Key'])}\r\n` +
               '\r\n');
      
      });
  c.on('end', () => {
  });
    console.log('client disconnected');
});
server.on('error', (err) => {
  throw err;
});
server.listen(4040, () => {
  console.log('server bound');
});



const SecWSHeader = header => {
		const hash = crypto.createHash('sha1');
    hash.update(header + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    return (hash.digest('base64'));
}
