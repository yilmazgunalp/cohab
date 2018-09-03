config = {
MAILHOST: 'smtp.sendgrid.net',
MAILUSER: 'apikey',
MAILAPIKEY: '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',
SENDERHOST: 'parentwood.net.au',
SECRET: '82Lcc1ZQBPRc0+/Hly+qYYtjI/RqT1Eypd8CkOlgwHALgb3B3sBPZwMZm4kbC0GXAUAQNuaRABCKYvS2anYquTmt2d9EqeVylbftU0bA+XqsweRk477G5AZcp1zpsakzjUFh3WERCOnLUhD8nRzlngsKC4fROHmFYLriAzGBuGW9axNGTBAhN/4lJT7k3O/0nQ0YLcV7wMhvtXUeM0OLvG8mVkajYb5/ZV+Zebyb7fDoWMsxJucj1Zs8zMdwwj8HSLkfQowYquFQ763cw8iq+1MGbvW7wrhUs7hXc0wTwt9j8xUQHnj7JpHQfXsc7N75IvEIGEx3fjEqGVPeAUcmbA==',
port: process.env.PORT || 3000,
expireTime: 24*60,
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
