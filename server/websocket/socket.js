//socket.write(Buffer.from([0x81,0x0d,0x68,0x65,0x6c,0x6c,0x6f,0x20,0x43,0x6c,0x69,0x65,0x6e,0x74,0x21]));
//let data = Buffer.from('hello again Client!');
//let header = Buffer.from([0x81,0x13]);
//  let frame = Buffer.concat([header,data]);
//socket.write(frame);


exports.readFrame = data => {
  let fin = (data[0] & 0x80) === 0x80;
  let rsv1 = (data[0] & 0x40);
  let rsv2 = (data[0] & 0x20);
  let rsv3 = (data[0] & 0x10);
  let opcode = data[0] & 0x0F; // if this equals to  1 then payload is utf encoded text.
  let mask = (data[1] & 0x80);
  let length = (data[1] & 0x7F); // reads the last seven digits of the second byte

  let nextByte = 2;
  if (length === 126) {
     length = data.readUInt16BE(2)
    nextByte += 2;
  } else if (length === 127){
    console.error('No Implementation for 64bit Integers')
    nextByte += 8;
  }
  console.log(length)
  let maskingKey = null;
  if (mask){
    maskingKey = data.slice(nextByte, nextByte + 4);
    nextByte += 4;
  }
  let payload = data.slice(nextByte, nextByte + length);

  if (maskingKey){
    for (let i = 0; i < payload.length; i++){
      payload[i] = payload[i] ^ maskingKey[i % 4];
    }
  }
console.log('j;ajl;saljas;l',payload.toString())
}

