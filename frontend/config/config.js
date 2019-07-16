let wss;

const setupConstants = () => {
  switch(process.env.NODE_ENV) {
    case 'production': 
      wss = 'ws://13.210.39.214:4040';
      break;
    case 'development': 
      wss = 'localhost:4040';
      break;
  }
}
setupConstants();

module.exports = {
  wss
}
