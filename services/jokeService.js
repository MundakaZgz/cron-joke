const https = require('https');

const SERVICE_URL = 'https://icanhazdadjoke.com';

function jokeService() {
    this.getJoke = function() {
        return https.get(SERVICE_URL, res => {
            res.on('data', chunk => {
                return chunk
            })
        })
    };
};

module.exports = new jokeService();