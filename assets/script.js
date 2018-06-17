 // Initial array of movies
 var searchButtonArr = ["cat", "dog", "snake"];

 for (var i = 0; i < searchButtonArr.length; i++){
     renderButtons(searchButtonArr[i]);
 }
 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function checkSearchInfo() {
   var searchTerm = $("#search-input").val().trim();
   $('#search-input').val('');
// The movie from the textbox is then added to our array
   
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

 // Performing an AJAX request with the queryURL
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   // After data comes back from the request
   .then(function(response) {
console.log(response);

if (response.data.length < 10){
alert("we could not find enough related gifs in our database for that search term");
}
else if (searchButtonArr.includes(searchTerm)){
alert("You have already entered that search term");

}
else{


searchButtonArr.push(searchTerm);
console.log(searchTerm);

renderButtons(searchTerm);
}
});

}

function displaySearchInfo(searchID) {
$("#gif-view").html("");


// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
searchID + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing an AJAX request with the queryURL
$.ajax({
url: queryURL,
method: "GET"
})
// After data comes back from the request
.then(function(response) {
console.log(queryURL);

console.log(response);
// storing the data from the AJAX request in the results variable
var results = response.data;

// Looping through each result item
for (var i = 0; i < results.length; i++) {

 // Creating and storing a div tag
 var gifDiv = $("<div>");

 // Creating a paragraph tag with the result item's rating
 var rating = $("<p>").text("Rating: " + results[i].rating);

 // Creating and storing an image tag
 var gifImage = $("<img>");
 // Setting the src attribute of the image to a property pulled off the result item
 gifImage.attr("src", results[i].images.fixed_height_still.url);
 gifImage.addClass("gifs");
 gifDiv.addClass("gif-divs")
 gifImage.attr("data-still", results[i].images.fixed_height_still.url);
 gifImage.attr("data-animate", results[i].images.fixed_height.url);
 gifImage.attr("data-state", "still");
 // Appending the paragraph and image tag to the gifDiv
 gifDiv.append(rating);
 gifDiv.append(gifImage);

 // Prependng the div
 $("#gif-view").append(gifDiv);
}
});
}

$("#gif-view").on("click", ".gifs",  function() {
   console.log("test")
 // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
 var state = $(this).attr("data-state");
 // If the clicked image's state is still, update its src attribute to what its data-animate value is.
 // Then, set the image's data-state to animate
 // Else set src to the data-still value
 if (state == "still") {
   $(this).attr("src", $(this).attr("data-animate"));
   $(this).attr("data-state", "animate");
 } else {
   $(this).attr("src", $(this).attr("data-still"));
   $(this).attr("data-state", "still");
 }
});


 // Function for displaying movie data
 function renderButtons(buttonName) {
     var a = $("<button>");
     // Adds a class of movie to our button
     a.addClass("search-button");
     // Added a data-attribute
     a.attr("data-name", buttonName);
     // Provided the initial button text
     a.text(buttonName);
     // Added the button to the buttons-view div
     $("#buttons-view").append(a);
   
 }

 // This function handles events where the add movie button is clicked
 $("#add-search").on("click", function(event) {
   console.log("stuff")
   event.preventDefault();
   checkSearchInfo();
   // This line of code will grab the input from the textbox
   

   // Calling renderButtons which handles the processing of our movie array

 });

 // Adding click event listeners to all elements with a class of "movie"
 $("#buttons-view").on("click", ".search-button",  function() {
  
   displaySearchInfo(($(this).attr("data-name")));
   
   

   });

 // Calling the renderButtons function to display the intial buttons