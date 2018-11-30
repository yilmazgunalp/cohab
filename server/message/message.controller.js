const util = require('../modules/util');
const crypto = require('crypto');
const JWT  = require('../modules/jwt.js');
const net = require('net');

exports.GET = {
ping:        (req,resp)=> {
                resp.writeHead(101,{'Connection': 'Upgrade','Upgrade': 'websocket',
                  'Sec-WebSocket-Accept': SecWSHeader(req.headers['sec-websocket-key'])});
                  resp.end('jljljlj')
               }
}


