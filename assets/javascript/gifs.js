$(document).ready(function() {
var buttonArr = ["happy", "sad", "joyful", "angry", "curious", "confused", "disappointed" ]
var subject = "";

function setupBtn() {

  $("#buttons").empty();
  for (var i=0; i<buttonArr.length; i++) {
  var $btn = $("<button>");
  $btn.addClass("feeling-btn");
  $btn.attr("data-name", buttonArr[i]);
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

$("#buttons").on("click", function() {
  subject = $(this).attr("data-name");
  console.log(subject);
 
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=My874J3ozBuVPh6WVzLd3QAFFDDgi5NP&q=" + subject + 
 "&limit=10&offset=0&rating=PG&lang=en"
  
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
    
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
        // result item
        gifImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(gifImage);

        // Prepending the gifDiv to the "#gifs" div in the HTML
        $("#gifs").prepend(gifDiv);
      
      }
 
 
  });
 
 });
 


// Calling the setupBtn function to display the intial buttons
setupBtn();
});