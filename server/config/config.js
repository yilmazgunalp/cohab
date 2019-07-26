const config = {
port: process.env.PORT || 3000,
host: process.env.CHB_URL,
SECRET: 'IPK6z2cfl2W1A9RKd2KBj14HOYlZqBA7'
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;

let  envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = Object.assign(config, envConfig);
