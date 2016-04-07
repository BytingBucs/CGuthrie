var main = function (toDoObjects) {
    "use strict";

    var toDos,
        tabs = [];
        
    toDoObjects.map(function (toDo) {
          return toDo.description;
    });
    
    tabs.push({
        "name":"Newest",
        "content":function () {
            $.get("todos.json", function (toDoObjects) {
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                
                callback($content);
            });
        }
    });
    
    tabs.push({
        "name":"Oldest",
        "content":function () {
            $.get("todos.json", function (toDoObjects) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                
                callback($content);
            });
        }
    });
    
    tabs.push({
        "name":"Tags",
        "content":function () {
            $.get("todos.json", function (toDoObjects) {
                callback($content);
            });
        }
    });
    
    tabs.push({
        "name":"Add",
        "content":function () {
            $.get("todos.json", function (toDoObjects) {
                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description":description, "tags":tags};
                        
                    $.post("todos", newToDo, function (result) {
                        // clear out our input boxes
                        $input.val("");
                        $tagInput.val("");
                        
                        // 'click' on the Newest tab
                        $(".tabs a:first span").trigger("click");
                    });
                });
                
                callback($content);
            });
        }
    });
    
    tabs.forEach(function (tab) {
        var $aElement = $("<a>").attr("href",""),
            $spanElement = $("<span>").text(tab.name);
            
        $aElement.append($spanElement);
        
        $spanElement.on("click", function () {
            var $content;
            
            $(".tabs a span").removeClass("active");
            $spanElement.addClass("active");
            $("main .content").empty();
            
            $content = tab.content();
            
            $("main .content").append($content);
            return false;
        });
        
        $("main .tabs").append($aElement);
    });
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
    tab.content(function ($content) {
        $("main .content").append($content);
    });
});
