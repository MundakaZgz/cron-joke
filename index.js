var CronJob = require('cron').CronJob;
var service = require('./src/index');

// create a cron service that retrieves the information from the joke service and sends it to the mail service
// var job = new CronJob('0,30 * * * * 1-5', () => {
var job = new CronJob('* * * * *', () => {
        service.sendMail();
    },
    true, /* Start the job right now */
    'Europe/Madrid' /* Time zone of this job. */
);