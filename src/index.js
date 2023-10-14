const config = require('./config.dev');
const handlebars = require("handlebars");
const nodemailer = require('nodemailer');
const path = require("path");
const fs = require("fs");
const viewPath =  path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');

const sendMail = () => {

    var mailConfig;
    if (process.env.NODE_ENV === 'production' ){
        // all emails are delivered to destination
        mailConfig = {
            service: 'gmail',
            auth: config.credentials
        };
    } else {
        // all emails are catched by ethereal.email
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: '******',
                pass: '******'
            }
        };
    }

    let transporter = nodemailer.createTransport(mailConfig);

    handlebars.registerPartial('header', fs.readFileSync(partialsPath + '/header.handlebars', 'utf8'));
    handlebars.registerPartial('footer', fs.readFileSync(partialsPath + '/footer.handlebars', 'utf8'));

    var template = handlebars.compile(fs.readFileSync(viewPath + '/index.handlebars', 'utf8'));

    fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const mailOptions = {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            subject: 'Here is your daily joke!',
            html: template({ joke: data.joke })
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    })
    .catch(error => console.log(error));
}

module.exports = { sendMail };