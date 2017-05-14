// Initial array of movies
var characters = ["Bruce the Shark", "Mr Incredible", "Alec Azam", "Nemo", "Violet Parr", "Lotso", "Sulley", "Carl Fredricksen", "Woody", "Dug the Dog", "Buzz Lightyear", "Edna Mode", "Mike Wazowski", "Dory", "WALL-E", ];

function displayPixarGiphy() {

	$("#pixarChar").empty();

	var pixarChar = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        pixarChar + "&rating=g&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);

	  var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var pixarImage = $("<img>");
            pixarImage.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state","still").attr("class","gif img-rounded img-responsive");

            gifDiv.prepend(pixarImage);
            gifDiv.prepend(p);

            $("#pixarChar").prepend(gifDiv);
          }	  
	});

}




// Function for displaying character data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#pixarButtons").empty();

    // Looping through the array of Pixar characters
    for (var i = 0; i < characters.length; i++) {

      var a = $("<button>");
      // Adding a class of pixarBtn to our button
      a.addClass("pixarBtn btn btn-default");
      // Adding a data-attribute
      a.attr("data-name", characters[i]);
      // Providing the initial button text
      a.text(characters[i]);
      // Adding the button to the buttons-view div
      $("#pixarButtons").append(a);
    }
  }

  renderButtons();

  $(document).on("click", ".gif", function(){

     	console.log("Reached");

      var state = $(this).attr("data-state");

      if (state==="still"){
        
        $(this).attr("src", $(this).attr("data-animate"))
        .attr("data-state","animate");  
      }

      else{
        $(this).attr("src", $(this).attr("data-still"))
        .attr("data-state","still"); 
      }
    });

  // This function handles events where an add pixar character button is clicked
      $("#addPixar").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var  pixaradd = $("#pixar-input").val().trim();

        if(pixaradd!="")
          characters.push(pixaradd);

        // Calling renderButtons which handles the processing of our character array
        renderButtons();
      });

  // Adding a click event listener to all elements with a class of "pixarBtn"
      $(document).on("click", ".pixarBtn", displayPixarGiphy);

  