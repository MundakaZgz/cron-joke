var request = require('request');

const SERVICE_URL = 'https://icanhazdadjoke.com';

function jokeService() {
    this.getJoke = function() {
        return new Promise(function(resolve, reject) {
            request(SERVICE_URL, { json: true }, (err, res, body) => {
                if (err) { reject(err); }
                resolve(res.body.joke);
            });
        });
    };
};

module.exports = new jokeService();