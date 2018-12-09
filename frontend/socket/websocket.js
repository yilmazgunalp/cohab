// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:4040');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
socket.onopen = function (event) {
  socket.send(" the MASK bit was set (and it should be, for client-to-server messages), read the next 4 octets (32 bits); this is the masking key. Once the payload length and masking key is decoded, you can go ahead and read that number of bytes from the socket. Let's call the data ENCODED, and the key MASK. To get DECODED, loop through the octets (bytes a.k.a. characters for text data) of ENCODED and XOR the octet with the (i modulo 4)th octet of MASK. In pseudo-code (that happens to be valid JavaScript):"); 
};
socket.onerror = e => console.log('Socket Error',e)
console.log(socket)
