
// Initial array of animals
var animals = ["dog", "cat", "spiders"]; //Every function can see this array

     //----------- To bring the Gifs to the screen----------------

     // displayGifInfo function re-renders the HTML to display the appropriate content
// Function for displaying Gif data
function displayAnimalGifs() {
//  $("#animals").empty(); // erasing anything in this div id so that it doesnt duplicate the results
  var animal = $(this).attr("data-name");
  console.log(animal);
  //variable 'queryURL' will store our url with the appropiate parameters
  var queryURL ="https://api.giphy.com/v1/gifs/search?q="  + animal +  "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);
  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {
    console.log(response)
    // erasing anything in this div id so that it doesnt keep any from the previous click
    $("#animals").empty();
    // Storing the Gif data
    var gifresults = response.data;
    for (var i=0; i<gifresults.length;i++) {
      // Creating a div to hold the animal
      var animalDiv = $("<div>");
      // Creating an element to have the Gif displayed
      var gifImage = $("<img>").attr("src", gifresults[i].images.original.url)
                               .attr("data-animate", gifresults[i].images.original.url )
                               .attr("data-still", gifresults[i].images.original_still.url)
                               .attr("data-state","animate")
                               .addClass("gif");
      // Adding the retraived image to the created div 
      animalDiv.append(gifImage);
      console.log(animalDiv);
      // Displaying the data
      $("#animals").append(animalDiv);
    }
  });   
};
            //-------- To change the state of the Gifs  (animate/still) ------------

            //  Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state, "This was the state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

               //----- To create more buttons -------

// Function for displaying animal data
function renderButtons() {
  // Deleting the Gifs prior to adding new Gifs
  // (this is necessary in order to eliminate the existing display of buttons because we are genarating a new set now including the new button)
  $("#animalButtons").empty();
  // Looping through the array of animals to dynamicaly generating buttons for each animal in the array
  for (var i = 0; i < animals.length; i++) {
    console.log(animals.length);
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to each button
    a.addClass("animal-btn");
    // Adding a data-attribute to each button
    a.attr("data-name", animals[i]);
    //Providing the initial button text
    a.text(animals[i]);     //this is the label of the button
    // Adding the button to the buttons-view div to display it
    $("#animalButtons").append(a);
  }
}

             //----- Receiving and evaluating user input to create more buttons -------

// This function handles events when new animal es entered and sumit button is clicked
$("#addAnimals").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();
  //to prevent creating a blank button
  if (animal==""){
    return false;
  };
  // to prevent creating an existing button
  var checkerExistingButton = animals.indexOf(animal);
  if( checkerExistingButton === -1) {   //it means entered animal was not found
    // Adding animal from the textbox to our array
    animals.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
  } else  {
    alert("This button already exist, enter another animal or click on its button");
    $("#animal-input").val("");
    return false; 
  };
  //to clear the text box to be ready for the next user input
  $("#animal-input").val("");
});

// Adding a click event listener to all elements with a class of "animal-btn"
// ...using this form because the buttons pertain only to the DOM
$(document).on("click", ".animal-btn", displayAnimalGifs);

  // Calling the renderButtons function to create and display the intial buttons
renderButtons(); 
 
