var poker = require("./poker.js"),
	express = require("express"),
	http = require("http"),
	app = express(),
    parser = require("body-parser"),
    hand = [];

app.use(express.static(__dirname + "/client"));

app.use(parser.urlencoded({extended:true}));

app.use(parser.json());

http.createServer(app).listen(3000);

app.get("/hand.json", function (req, res) {
    res.json(hand);
});

app.post("/hand", function (req, res) {
    var newHand = req.body;

    console.log(result);

    var pair = poker.containsPair(result),
    	threeOfAKind = poker.containsThreeOfAKind(result);

    hand.push(newHand);
});