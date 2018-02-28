var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var JokeService = require('./jokeService');
var jokeService = new JokeService();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'joseantonio@zartis.com',
        pass: 'Northe15.'
    }
});

var mailOptions = {
    from: 'joseantonio@zartis.com',
    to: 'joseantonio@zartis.com',
    subject: 'Chiste del día!!!',
    text: ''
};

var job = new CronJob('0,30 * * * * 1-5', function() {
        jokeService.getJoke()
            .then(function(joke) { sendJoke(joke); })
            .catch(function(err) { console.log(err); });
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