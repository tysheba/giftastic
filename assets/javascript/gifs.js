 // queryURL for Giphy API
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=My874J3ozBuVPh6WVzLd3QAFFDDgi5NP&q=" + feeling + 
 "&limit=10&offset=0&rating=PG&lang=en"

 var feeling = $("#feeling-input").val();
 var buttonArr = ["happy", "sad", "joyful", "angry", "curious", "confused", "disappointed" ]

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

 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
   console.log(response);
   $("#gifs").text(JSON.stringify(response));
 });