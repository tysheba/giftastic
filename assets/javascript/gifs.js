 // queryURL for Giphy API
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=My874J3ozBuVPh6WVzLd3QAFFDDgi5NP&q=" + feeling + 
 "&limit=10&offset=0&rating=PG&lang=en"

 var feeling = $("#feeling-input").val();
 var buttonArr = {happy, sad, joyful, angry, curious, confused, disappointed }

 function setupBtn() {
   for (var i=0; i<buttonArr.length; i++) {
     $("#button").append(buttonArr[i]);
   }
 }

 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
   console.log(response);
   $("#gifs").text(JSON.stringify(response));
 });