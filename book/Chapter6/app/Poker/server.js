var express = require("express"),
	http = require("http"),
	app = express(),
    parser = require("body-parser"),
    poker = require("./poker.js");

app.use(express.static(__dirname + "/client"));

app.use(parser.urlencoded({extended:true}));

app.use(parser.json());

http.createServer(app).listen(3000);

app.post("/hand", function (req, res) {

    var result = poker.getHand(req.body.hand),
        pair = poker.containsPair(result),
        twoPair = poker.containsTwoPair(result),
    	threeOfAKind = poker.containsThreeOfAKind(result),
        fourOfAKind = poker.containsFourOfAKind(result),
    	// insert more hands here
        highestRanked;

    if (fourOfAKind === true) {
        highestRanked = "You have Four of a Kind";
    }
    else if (threeOfAKind === true) {
        highestRanked = "You have Three of a Kind";
    }
    else if (twoPair === true) {
        highestRanked = "You have Two Pairs";
    }
    else if (pair === true) {
        highestRanked = "You have a Pair";
    }
    else {
        highestRanked = "That is not a winning hand";
    }
    
    res.json(highestRanked);
});