var main = function () {
    "use strict";
    
    // getJSON even parses the JSON for us, so we don't need to
    // call JSON.parse
    $.getJSON("cards/aceOfSpades.json", function (card) {
        // create an element to hold the card
        var $cardParagraph = $("<p>");
        
        // create the text to go into the element
        // we created
        $cardParagraph.text(card.rank + " of " + card.suit);
        
        // sppend the card paragraph to main
        $("main").append($cardParagraph);
    });
    
    $.getJSON("cards/hand.json", function (hand) {
        var $list = $("<ul>");
        
        // hand is an array so we can interate over it using
        // a forEach loop
        hand.forEach (function (card) {
            // create a list item to hold the card and
            // append it to the list
            var $card = $("<li>");
            $card.text(card.rank + " of " + card.suit);
            $list.append($card);
        });
        
        // append the list to main
        $("main").append($list);
    });
};

$(document).ready(main);