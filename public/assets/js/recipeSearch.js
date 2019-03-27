$("#savButton").on("click", function () {
  console.log(this);
  var recName = $(this).data("recname");
  var recImage = $(this).data("recimage");
  var recUrl = $(this).data("recurl");

  console.log(recName);
  console.log(recImage);
  console.log(recUrl);


});


// $("#searchSubmit").on("click", function (event) {
//   // Make sure to preventDefault on a submit event.
//   event.preventDefault();

//   // [name=plan] will find an element with a "name" attribute equal to the string "plan"
//   var ingredient = $("#ingredientName").val().trim()
//   console.log(ingredient);


//   // Send the GET request.
//   $.get("/getRecipes/" + ingredient, {});
// });






//   $("#recbutton").on("click", function (event) {
//     // Don't refresh the page!
//     event.preventDefault();
//     console.log("it works");

//     $(".apiInfo").empty();

//     var objArr = [];
//     // Grabs user input
//     var teamName = $(".materialize-textarea").val().trim();
//     console.log(teamName);
//     var lowStr = teamName.toLowerCase();
//     var ingredient = lowStr.replace(/ /g, "-");
//     console.log(ingredient);


//     $.get("api/recipesearch/"+ ingredient, function(response) {
//         for (i = 0; i < response.hits.length; i++) {

//             console.log(response.hits[i].recipe.label);

//             var memImageURL = response.hits[i].recipe.image;             
//             var recImage = $("<img>");
//             var itemHLink = response.hits[i].recipe.url;

//             recImage.attr("src", memImageURL);
//             recImage.attr("href", itemHLink);
//             recImage.wrap($("<a>").attr("href", itemHLink));
//             recImage.attr("alt", "Memorabilia Image");
//             recImage.addClass("picLink");


//             var recLink = $("<a target=_blank>");
//             recLink.attr("href", itemHLink);
//             recLink.text(response.hits[i].recipe.label);
//             recLink.addClass("recLink");

//             $(".apiInfo").append(recImage).append(recLink);
//         }    
// })

//     });