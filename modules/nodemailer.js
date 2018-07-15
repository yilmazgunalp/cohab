let config = require('../config.js');
let nodemailer = require('nodemailer');

let mailOptions = {
        from: '', // sender address
        to: '', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

let transporter = nodemailer.createTransport({
        host: config.MAILHOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.MAILUSER, // generated ethereal user
            pass: config.MAILAPIKEY// generated ethereal password
        }
    },mailOptions);

module.exports = transporter;
