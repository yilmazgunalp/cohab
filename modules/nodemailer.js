let config = require('../config.js');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
        host: config.MAILHOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.MAILUSER, // generated ethereal user
            pass: config.MAILAPIKEY// generated ethereal password
        }
    });
const setOptions = (user,subject) => {
  return {
    from: `activation@${config.SENDERHOST}`,
    to: user.email,
    subject,
    text: `Please click on the link below to activate your account\n ${user.getActivationLink}`,
    html: `<div><h2>Hey ${user.username}!</h2><h3>Please click the button below to activate your account</h3><a href=\"${user.getActivationLink()}\" style="background: #fce300; font-size: 16px; text-decoration: none; color: black; display: iniline-block; padding: 5px; border-radius: 3px"> Activate Your Account </a></div>`
  } 
}
const sendActivationMail = (user,subject) => {
  let options = setOptions(user,subject);
    transporter.sendMail(options,(err,info) => {
      if(err) console.log(err);
      console.log(info)  ;
    })
}

module.exports = sendActivationMail;
