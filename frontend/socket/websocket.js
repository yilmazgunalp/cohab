//socket.onopen = function (event) {
//  socket.send(" the MASK bit was set (and it should be, for client-to-server messages), read the next 4 octets (32 bits); this is the masking key. Once the payload length and masking key is decoded, you can go ahead and read that number of bytes from the socket. Let's call the data ENCODED, and the key MASK. To get DECODED, loop through the octets (bytes a.k.a. characters for text data) of ENCODED and XOR the octet with the (i modulo 4)th octet of MASK. In pseudo-code (that happens to be valid JavaScript):"); 
//};
//socket.onerror = e => console.log('Socket Error',e)
//setTimeout(() => socket.send('I was born in Darkness'),500)
import store from '../redux/store';

export default class Socket {
    constructor(url) {
      let storeSocket = store.getState().socket;
      if(storeSocket){ 
      this._socket = storeSocket;
      }
      else
      this._socket = new WebSocket(url);
      store.dispatch({type: 'CREATE_SOCKET',socket: this._socket})
    }

    send(message) {
      this._socket.send(message)
    }
    
    addMessageListener(fn) {
      this._socket.addEventListener('message',fn);
    }

} 
