const config = {
port: process.env.PORT || 3000,
host: process.env.CHB_URL || 'http://localhost:3000',
}

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
config.env = process.env.NODE_ENV;

let  envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = Object.assign(config, envConfig);
