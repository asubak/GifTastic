//API Key = YBEI1xPdoBfwYvazIBw5xYLTNStcAA6y
//Making sure the document/window is ready
$(document).ready(function() {

    var animals = ["Bird", "Turtle", "Fish", "Snake", "Elephant", "Dog", "Cat", "Pig", "Duck", "Frog"];

//display animal buttons 
    function showGifButtons() {
        $("#animal-buttons").empty();
        for (var i = 0; i < animals.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.addClass("btn btn primary");
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#animal-buttons").append(gifButton);
        }
    }
//Taking info from form and displaying a new button.
    function addNewButton() {
        $("#animal-form").on("click", function() {
            var animal = $("#animal-input").val().trim();
            if (animal == "") {
                return false
            }
            animals.push(animal);

            showGifButtons();
            return false;
        });
    }
//Displaying the gifs, already made or created, but having an ajax call. 
    function displayGifs() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=YBEI1xPdoBfwYvazIBw5xYLTNStcAA6y&limit=10";
      
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                $("#animals").empty();
                var results = response.data;
                if (results == "") {
                    alert("No gifs available");
                }
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    
                    //Did not work Changed it to line 56-57 and 66-67?
                    //gifDiv.addClass("gifDiv");
                    //var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    //gifDiv.append(gifRating);
                    
                    //adding the rating and image for called gifs 
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url); // still image
                    gifImage.attr("data-animate", results[i].images.fixed_height.url); // animated image
                    gifImage.attr("data-state", "still"); // set the image state
                    gifImage.addClass("image");
                    

                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#animals").prepend(gifDiv);
                }
            });
    }
//Calling functions
    showGifButtons();
    addNewButton();
    $(document).on("click", ".animal", displayGifs);
    $(document).on("click", ".image", function() {
    	
    	//Does this work? No!
    	//animals.push(animal);

        //Setting the state of gifs and if it is still, which it should be when called from line 64, then animate when clicked. 
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});