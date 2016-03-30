var poker = {},
    containsNTimes,
    ranks = [ "two", "three", "four", "five", "six", "seven", "eight",
             "nine", "ten", "jack", "queen", "king", "ace" ],
    suits = [ "diamonds", "spades", "hearts", "clubs" ];

containsNTimes = function (arrayHand, strRank, numberTimes) {
    var occured = false,
        counter = 0;

    array.forEach(function (card) {
        if ( card === strRank ) {
            count += 1;
        };
    });

    if ( count === numberTimes ) {
        occuredN = true;
    };

    return occured;
};

poker.containsPair = function (hand) {
    var result = false,
        handRanks;
        
    handRanks = hand.map(function (card) {
        return card.rank;
    });
    
    ranks.forEach(function (rank) {
        if ( containsNTimes(handRanks, rank, 2) ) {
            result = true;
        }
    });
    
    return result;
};

poker.containsTwoPair = function (hand) {
    var result = false,
        handRanks;

    handRanks = hand.map(function (card) {
        return card.rank;
    });

    // Remove duplicate ranks
    // ranksUnique = ranks.filter (function (v, i, a)
    //    { return a.indexOf (v) == i });

    ranks.forEach(function (rank) {
        if ((containsNTimes(handRanks, rank[0], 2) &&
            containsNTimes(handRanks, rank[1], 2)) ||
            (containsNTimes(handRanks, rank[0], 2) &&
            containsNTimes(handRanks, rank[2], 2)) ||
            (containsNTimes(handRanks, rank[0], 2) &&
            containsNTimes(handRanks, rank[3], 2)) ||
            (containsNTimes(handRanks, rank[0], 2) &&
            containsNTimes(handRanks, rank[4], 2)) ||
            (containsNTimes(handRanks, rank[1], 2) &&
            containsNTimes(handRanks, rank[2], 2)) ||
            (containsNTimes(handRanks, rank[1], 2) &&
            containsNTimes(handRanks, rank[3], 2)) ||
            (containsNTimes(handRanks, rank[1], 2) &&
            containsNTimes(handRanks, rank[4], 2)) ||
            (containsNTimes(handRanks, rank[2], 2) &&
            containsNTimes(handRanks, rank[3], 2)) ||
            (containsNTimes(handRanks, rank[2], 2) &&
            containsNTimes(handRanks, rank[4], 2)) ||
            (containsNTimes(handRanks, rank[3], 2) &&
            containsNTimes(handRanks, rank[4], 2))) {
            result = true;
        }
    });
};

poker.containsThreeOfAKind = function (hand) {
    var result = false,
        handRanks;
        
    handRanks = hand.map(function (card) {
        return card.rank;
    });
    
    ranks.forEach(function (rank) {
        if ( containsNTimes(handRanks, rank, 3) ) {
            result = true;
        }
    });
    
    return result;
};
    
poker.containsFourOfAKind = function (hand) {
    var result = false,
        handRanks;
        
    handRanks = hand.map(function (card) {
        return card.rank;
    });
    
    ranks.forEach(function (rank) {
        if ( containsNTimes(handRanks, rank, 4) ) {
            result = true;
        }
    });
    
    return result;
};

module.exports = poker;