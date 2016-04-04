var main = function() {
	var hand = [
            { "rank":"two", "suit":"spades" },
			{ "rank":"two", "suit":"hearts" },
			{ "rank":"two", "suit":"clubs" },
			{ "rank":"five", "suit":"spades" },
			{ "rank":"eight", "suit":"diamonds" }
        ];

	$.post("hand", {hand}, function (result) {
		$( ".output" ).html(result);
	});
};

$(document).ready(main);