// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000/message/ping');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
socket.onopen = function (event) {
  socket.send("Here's some text that the server is urgently awaiting!"); 
};
socket.onerror = e => console.log('Socket Error',e)
console.log(socket)
