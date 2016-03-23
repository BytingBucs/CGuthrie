var main = function () {
    "use strict";
    
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
            "tags=dogs&format=json&jsoncallback=?";

    $.getJSON(url, function (flickrResponse) {
        flickrResponse.items.forEach(function (photo) {
            // create variable to hold the <img> tag
            var $img = $("<img>").hide();
            
            $img.attr("src", photo.media.m);
            
            // append images to the photos class in main
            $("main .photos").append($img);
            $img.fadeIn();
        });
    });
};

$(document).ready(main);