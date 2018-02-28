var CronJob = require('cron').CronJob;
var request = require('request');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

var mailOptions = {
    from: '',
    to: '',
    subject: 'Chiste del día!!!',
    text: ''
};

var job = new CronJob('0 10 9,17 * * 1-5', function() {
        var joke = getJoke()
            .then(function(joke) { sendJoke(joke); })
            .catch(function(err) { console.log(err); });
    }, function() {
        /* This function is executed when the job stops */
    },
    true, /* Start the job right now */
    'Europe/Madrid' /* Time zone of this job. */
);

var sendJoke = function(joke) {
    mailOptions.html = `<h1>Chistaco del día</h1><p>Buenos días!! Aquí tenés vuestro chiste del día patrocinado por nuestros sponsors habituales:</p></br><p style="font-style:italic">${joke}</p></br><p>JA</p>`;
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.respnse);
        }
    });
};

var getJoke = function() {

    return new Promise(function(resolve, reject) {
        request('https://icanhazdadjoke.com/', { json: true }, (err, res, body) => {
            if (err) { reject(err); }
            resolve(res.body.joke);
        });
    });
};