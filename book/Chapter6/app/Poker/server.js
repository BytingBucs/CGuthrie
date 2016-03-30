var express = require("express"),
	http = require("http"),
	app = express(),
    parser = require("body-parser"),
    poker = require("./poker.js"),
    hand = [];

app.use(express.static(__dirname + "/client"));

app.use(parser.urlencoded({extended:true}));

app.use(parser.json());

http.createServer(app).listen(3000);

app.get("/hand.json", function (req, res) {
    res.json(hand);
});

app.post("/hand", function (req, res) {

    var pair = poker.containsPair(result),
        twoPair = poker.containsTwoPair(result),
    	threeOfAKind = poker.containsThreeOfAKind(result),
        fourOfAKind = poker.containsFourOfAKind(result);
    	// insert more hands here
        highestRanked;

    if (fourOfAKind === true) {
        highestRanked = "Four of a Kind";
    }
    else if (threeOfAKind === true) {
        highestRanked = "Three of a Kind";
    }
    else if (twoPair === true) {
        highestRanked = "Two Pairs";
    }
    else if (twoPair === true) {
        highestRanked = "Pair";
    }
    else {
        highestRanked = "That is not a winning hand";
    }
});