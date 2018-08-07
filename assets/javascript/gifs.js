
var buttonArr = ["Love", "Happiness", "Joy", "Excitement", "Thrill", "Amused", "Angry", "Sad", "Bored", "Sleepy", 
"Tired", "Frustrated", "Disappointed", "Confused", "Sorry", "Scared"]

var subject = "";

function setupBtn() {

  $("#buttons").empty();
  for (var i=0; i<buttonArr.length; i++) {
  var $btn = $("<button>");
  $btn.addClass("feeling-btn btn-primary btn-lg active");
  $btn.attr('id', 'feelings');
  $btn.attr("data-value", buttonArr[i]);
  $btn.text(buttonArr[i]);
  $("#buttons").append($btn);
 }
}


$("#add-button").on("click", function (event) {
  event.preventDefault();
  var newFeeling = $("#input").val().trim();
  buttonArr.push(newFeeling);
  setupBtn ();
});

setupBtn();

$(document).on("click", ".feeling-btn", showEmotion);

function showEmotion () {

  var emotion = $(this).attr("data-value")
  console.log(emotion)

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=My874J3ozBuVPh6WVzLd3QAFFDDgi5NP&q=" + emotion + 
 "&limit=10&offset=0&rating=PG&lang=en"
  
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      $("#gifs").empty();

      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Creating a div with the class "item"
        var gifDiv = $("<span class='item'>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var gifImage = $("<img>");

        // Giving the image tag a src attribute of a property pulled off the
        // result item and adding data attributes for the different property
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-pause", results[i].images.fixed_height_still.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gifImage");

        // Appending the paragraph and gifImage to the "gifDiv" div
        gifDiv.append(p);
        gifDiv.append(gifImage);

        // Prepending the gifDiv to the "#gifs" div in the HTML
        $("#gifs").prepend(gifDiv);
      
      }


  });

}

$(document).on("click", ".gifImage", function() {
  console.log("image was clicked")
  var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is animate, update its src attribute to what its data-still value is.
  // Then, set the image's data-state to still
  // Else set src to the data-animate value
  if (state === "animate") {
    $(this).attr("src", $(this).attr("data-pause"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
});
