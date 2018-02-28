var nodemailer = require('nodemailer');
var mailConfig = require('./mailConfig.dev');

var mailService = function() {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: mailConfig.credentials
    });

    var getEmailBody = function(content) {
        return `<h1>Chistaco del día</h1><p>Buenos días!! Aquí tenés vuestro chiste del día patrocinado por nuestros sponsors habituales:</p></br><p style="font-style:italic">${content}</p></br><p>JA</p>`;
    }

    this.sendJoke = function(content) {
        var mailOptions = mailConfig.mail;
        mailOptions.html = getEmailBody(content);
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
};

module.exports = new mailService();