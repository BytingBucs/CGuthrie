var ntwitter = require('ntwitter'),
    credentials = require('./credentials.json'),
    twitter,
    counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

var trackedWords = ["awesome", "cool", "rad", "gnarly", "groovy"];

trackedWords.forEach(function (word) {
                counts[word] = 0;
            });

twitter.stream(
    'statuses/filter',
    { track: trackedWords },
    function(stream) {
        stream.on('data', function(tweet) {
            if (tweet.text.indexOf("awesome") > -1) {
                // increment the awesome counter
                counts.awesome = counts.awesome + 1;
            }
            if (tweet.text.indexOf("cool") > -1) {
                // increment the cool counter
                counts.cool = counts.cool + 1;
            }
            if (tweet.text.indexOf("rad") > -1) {
                // increment the rad counter
                counts.rad = counts.rad + 1;
            }
            if (tweet.text.indexOf("gnarly") > -1) {
                // increment the gnarly counter
                counts.gnarly = counts.gnarly + 1;
            }
            if (tweet.text.indexOf("groovy") > -1) {
                // increment the groovy counter
                counts.groovy = counts.groovy + 1;
            }
        });
    }
);

setInterval(function () {
    console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;
