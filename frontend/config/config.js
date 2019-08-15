let wss;

const setupConstants = () => {
  switch(process.env.NODE_ENV) {
    case 'beta': 
      wss = 'ws://13.210.39.214:4040';
      break;
    case 'prod': 
      wss = 'ws://13.210.39.214:4040';
      break;
    case 'dev': 
      wss = 'ws://localhost:4040';
      break;
  }
}
setupConstants();

module.exports = {
  wss
}
