var CronJob = require('cron').CronJob;
var jokeService = require('./jokeService');
var mailService = require('./mail/mailService');

var job = new CronJob('0,30 * * * * 1-5', function() {
        jokeService.getJoke()
            .then(function(joke) { mailService.sendJoke(joke); })
            .catch(function(err) { console.log(err); });
    },
    true, /* Start the job right now */
    'Europe/Madrid' /* Time zone of this job. */
);