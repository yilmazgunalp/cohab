import store from '../redux/store';

export default class Socket {
    constructor(url,closeCallback) {
      let storeSocket = store.getState().socket;
      if(storeSocket && storeSocket.isOpen) 
      this._socket = storeSocket;
      else {
      this._socket = new WebSocket(url);
        console.log( "socket else")
        // TODO THIS IS SO DODGY!!!
      let cookie = document.cookie.split('=')[1]
      this._socket.onopen = _ => this._socket.send(cookie)
      this._socket.onclose = _ => this.isOpen = false; 
      this.isOpen = true;
      this._socket.addEventListener('close',closeCallback)
      store.dispatch({type: 'CREATE_SOCKET',socket: this})
        console.log( this)
      }
    }

    send(message) {
      this._socket.send(message)
    }

    
    addMessageListener(fn) {
      this._socket.addEventListener('message',fn);
    }

} 
