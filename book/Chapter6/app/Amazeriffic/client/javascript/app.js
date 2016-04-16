var main = function (toDoObjects) {
    "use strict";
    
    var toDos,
        tabs;
        
    toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });
    
    tabs = [];
    
    // newest tab
	tabs.push({
		"name":"Newest",
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {
				var $content = $("<ul>");
                
                for(var i = toDoObjects.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDoObjects[i].description));
                }
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
    
    tabs.push({
        "name":"Oldest",
        "content":function (callback) {
            $.get("todos.json", function (toDoObjects) {
                var $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });
    
	tabs.push({
		"name":"Tags",
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {
				var	tags = [];

				toDoObjects.forEach(function (toDo) {
					toDo.tags.forEach(function (tag) {
						if (tags.indexOf(tag) === -1) {
							tags.push(tag);
						}
					});
				});

				var tagObjects = tags.map(function (tag) {
					var toDosWithTag = [];
					
					toDoObjects.forEach(function (toDo) {
						if (toDo.tags.indexOf(tag) !== -1) {
							toDosWithTag.push(toDo.description);
						}
					});

					return {"name": tag, "ToDos": toDosWithTag};		
				});

				tagObjects.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name), $content = $("<ul>");

					$content.append($tagName);
					tag.ToDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					
					callback(null, $content);
				});
			}).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
			});
		}
	});
    
    tabs.push({
        "name":"Add",
        "content":function (callback) {
            $.get("todos.json", function (toDoObjects) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+"),
                    $content = $("<div>");
                
                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description": description, "tags": tags};
                    
                    $.post("todos", newToDo, function (reuslt) {
                        $input.val("");
                        $tagInput.val("");
                        
                        $(".tabs a:first span").trigger("click");
                    });
                });
                
                $content.append($inputLabel);
                $content.append($input);
                $content.append($tagLabel);
                $content.append($tagInput);
                $content.append($button);
                
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
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
            
            tab.content(function (err, $content) {
                $("main .content").append($content);
            });
            
            return false;
        });
        
        $("main .tabs").append($aElement);
    });
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});