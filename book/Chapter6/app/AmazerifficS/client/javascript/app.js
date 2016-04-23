var main = function(toDoObjects) {
	"use strict";
	
	var toDos,
		tabs;
	
	toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});
	
	//START OF THE TABS SECTION
	tabs = [];
	
	//Newest Tab
	tabs.push({
		"name": 	"Newest",
		"content":	function(callback) {
			$.get("todos.json", function(toDoObjects) {
				var $content = $("<ul>");
				//Slice is needed so we do not modify the original array.
				toDoObjects.slice().reverse().forEach(function(todo) {
					var $todoListItem = $("<li>").text(todo.description);
					var $todoRemoveLink = $("<a>").attr("href", "todos/"+todo._id);
					$todoRemoveLink.text("X");
					
					$todoRemoveLink.on("click", removeClick);
					
					$todoListItem.append($todoRemoveLink);
					$content.append($todoListItem);
				});
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				//Send error and null to callback.
				callback(error, null);
			});
		}
	});
	
	//Oldest Tab
	tabs.push({
		"name": 	"Oldest",
		"content":	function(callback) {
			$.get("todos.json", function(toDoObjects) {
				var $content = $("<ul>");
				toDoObjects.forEach(function(todo) {
					var $todoListItem = $("<li>").text(todo.description);
					var $todoRemoveLink = $("<a>").attr("href", "todos/"+todo._id);
					$todoRemoveLink.text("X");
					
					$todoRemoveLink.on("click", removeClick);
					
					$todoListItem.append($todoRemoveLink);
					$content.append($todoListItem);
				});
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				//Send error and null to callback.
				callback(error, null);
			});
		}
	});
	
	//Tags Tab
	tabs.push({
		"name": 	"Tags",
		"content":	function(callback) {
			$.get("todos.json", function(toDoObjects) {
				var organizedByTag = organizeByTag(toDoObjects);
				//console.log(organizedByTag);
				
				var $elements = [];
				
				organizedByTag.forEach(function(tag) {
					var $tagName = $("<h3>").text(tag.name);
					var $content = $("<ul>");

					$content.append($tagName);
						
					tag.toDos.forEach(function(todo) {
						var $todoListItem = $("<li>").text(todo.description);
						var $todoRemoveLink = $("<a>").attr("href", "todos/"+todo._id);
						$todoRemoveLink.text("X");
						
						$todoRemoveLink.on("click", removeClick);
						
						$todoListItem.append($todoRemoveLink);
						$content.append($todoListItem);
					});

					$elements.push($content);
				});
				callback(null, $elements);
				
			}).fail(function(jqXHR, textStatus, error) {
				//Send error and null to callback.
				callback(error, null);
			});
		}
	});
	
	//Add Tab
	tabs.push({
		"name": 	"Add",
		"content":	function(callback) {
			var $content = [];//$("<div>").addClass("addBox");
			
			var $inputLabel = $("<span>").text("Description: ");
			var $input = $("<input>").addClass("descriptionInput");
			$input.on("keypress", function(event) {
				if(event.keyCode === 13) {
					addItemToList();
				}
			});
			
			var $tagLabel = $("<span>").text("Tags: ");
			var $tagInput = $("<input>").addClass("tagsInputs");
			$input.on("keypress", function(event) {
				if(event.keyCode === 13) {
					addItemToList();
				}
			});
			
			var $button = $("<button>").text("Add");
			$button.on("click", function() {
				addItemToList();
			});
			
			$content.push($inputLabel);
			$content.push($input);
			$content.push($("<br>"));
			
			$content.push($tagLabel);
			$content.push($tagInput);
			$content.push($("<br>"));
			
			$content.push($button);
			console.log($content);
			callback(null, $content);
			
		}
	});
	
	//Add the tabs to the page
	tabs.forEach(function(tab) {
		var $aElement = $("<a>").attr("href", "#"),
			$spanElement = $("<span>").text(tab.name);
			
		$aElement.append($spanElement);
		
		$spanElement.on("click", function() {
			var $content;
			
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .container .content").empty();
			
			//get the content from the tab's content function
			tab.content(function(err, $content) {
				if(err !== null) {
					console.log("An error occured with your request");
					console.log(err);
				} else {
					// .html instead of .append so I can pack $content in a div.
					$("main .container .content").append($content);
				}
			});

			return false;
		});
		$("main .container .tabs").append($aElement);
	});
	
	//END OF THE TABS SECTION
	
	var addItemToList = function() {
		//Do the calls to the values need to be more specific?
		
		var $description = $("main .container .content .descriptionInput").val();
		var $tags = $("main .container. content .tagsInput").val().split(",");
		var newToDo = {"description": $description, "tags": $tags}

		if($description != "" && $tags != "") {

			$.post("todos", newToDo, function(response) {
				console.log(response);

				toDoObjects.push(newToDo);
	
				toDos = toDoObjects.map(function(toDo) {
					return toDo.description;
				});
			});		
			
			$("main .container .content .descriptionInput").val("");
			$("main .container .content .tagsInput").val("");
		}
	};
	/* I do not think this is used any more.
	$(".tabs a span").toArray().forEach(function(element) {
		var $element = $(element);
		$element.on("click", function() {
			$(".tabs a span").removeClass("active");
			$(element).addClass("active");
			//$("main .container .content").empty();
			
			if($element.parent().is(":nth-child(2)")) {
			} else if($element.parent().is(":nth-child(3)")) {				
			} else if($element.parent().is(":nth-child(4)")) {			
			}
			
			return false;
		});
	});
	*/
	$(".tabs a:first-child span").trigger("click");
};

var organizeByTag = function(toDoObjects) {
	var tags = [];

	toDoObjects.forEach(function(toDo) {
		toDo.tags.forEach(function(tag) {
			if(tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});
	
	var tagObjects = tags.map(function(tag) {
		var toDosWithTag = [];
		toDoObjects.forEach(function(toDo) {
			//console.log(toDo.tags);
			//console.log(toDo.tags.indexOf(tag));
			//console.log("-----");
			if(toDo.tags.indexOf(tag) !== -1) {
				toDosWithTag.push(toDo);
			}
		});
		
		return {"name": tag, "toDos": toDosWithTag};
	});

	return tagObjects;
};

var removeClick = function(event) {
	$.ajax({
		url: "todos/" + event.target.pathname.split("/").slice(-1)[0],
		type: "DELETE",
		success: function(result) {
			console.log("Delete request");
		}
	}).done(function() {
		// Remove DOM element.
		console.log(event.target.parentNode.remove());
	});
	// return false so link is not followed.
	return false;
}

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	}).fail(function(jqXHR, textStatus, error) {
		//ToDo list was empty.
		main([]);
	});;
});