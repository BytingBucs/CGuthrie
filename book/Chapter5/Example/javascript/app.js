var main = function () {
    "use strict";
    
    // create an empty object
    var r = {};
    
    // give s a name
    r.name = "Richardo";
    // give s some experience
    r.age = 33;
    // give s some friends
    r.friends = ["Jimmy", "Tommy", "Elsworth", "Theresa"];
    // give s a dog
    r.dog = {"name": "Rufus", "breed": "Pug"};
    
    console.log(r.name);
    console.log(r.age);
    console.log(r.friends[1]);
    console.log(r.dog);
    console.log(r.dog.name);
};

$(document).ready(main);