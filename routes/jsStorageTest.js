// ROUTE TO CREATE RECIPES TO USER DASHBOARDS DIDNT
// GET IT TO WORK YET

// router.post("/:user/recipes", function (req, res) {
//   var creator = {
//     id: req.user.id,
//     username: req.user.username
//   }

//   Recipe.create({
//       name: req.body.recName,
//       image: req.body.recImage,
//       url: req.body.recUrl,
//       user: creator
//     },
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//         res.redirect('back');
//       }
//     }
//   );


// })


// THIS IS A COPY OF THE RECIPE_SEARCH_RESULTS.HANDLEBARS to get it to work tomorrow
// const axios = require('axios')

// {{> navbar}}
// <div class="row" style="display:flex; flex-wrap:wrap">
// {{#each data}}
// <div class="col s6 m3">
//  <div class="card">
//         <div class="card-image">
//           <img src={{recipe.image}} class="cardImage">
//           <span class="card-title">{{recipe.label}}</span>
//           <button type="submit">Save Plan!</button>

//           <button data-recipeId="{{this.recipe._id}}" data-recipeImage="{{this.recipe.image}}" data-recipeName="{{this.recipe.label}}" 
//           data-recipeUrl="{{this.recipe.url}}" class="savePlan">Save Plan!</button>
//         </div>
//         <div class="card-content">
//           <p>{{recipe.url}}</p>
//         </div>
//       </div>
//   </div>
//   {{/each}}
//   </div>

// <script>
//   $(".savePlan).on("click", function(event) {
//     event.preventDefault();
//     // Get the ID from the button.
//     // This is shorthand for $(this).attr("data-planid")
//     console.log(this);
//     var recId = $(this).data("recipeId");
//     var recImage=$(this).data("recipeImage");
//     var recName=$(this).data("recipeName");
//     var recUrl =$(this).data("recipeUrl");

//  $.post("/:user/recipes", 
//  {name: recName, 
//  image: recImage, 
//  url: recUrl })
//     // On success, run the following code
//     .then(function() {
// });


// </script>

// {{> footer}}

// Materialize Card Code
/* <div class="card-image">
<img src={{recipe.image}} class="cardImage">
<span class="card-title">{{recipe.label}}</span>
<a href="/recipe/{{recipe._id}}"class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
</div>
<div class="card-content">
<p>{{recipe.url}}</p>
</div>
</div> */





/* CODE SNIPPET TO DO EACH OVER INGREDIENTS IN HBS
<ul>
           {{#each this.recipe.ingredients as |item|}}
            {{-- <li> 
            {{-- {{item}}
            {{-- </li> 
           {{-- {{/each}}  */


/* Materialize cards for recipeSearch
<div class="row" style="display:flex; flex-wrap:wrap">
{{#each data}}
<div class="col s6 m3">
 <div class="card">
        <div class="card-image">
          <img src={{recipe.image}} class="cardImage">
          <span class="card-title">{{recipe.label}}</span>
          <form id="buttonDesign" action="/recipes/user" method="POST">
            <button id="savButton" class="btn btn-danger">Save</button>
          </form>
        </div>
        <div class="card-content">
        </div>
      </div>
  </div>
  {{/each}}
  </div>  */

/* Questions to about the app to look at later

1. external api call then db.create function then send db.create function result to template 
instead of the api response

2. tried to include {{currentUser.username}} into recipe results save form in the action url but it doesnt 
show when inspecting buttons in dev tool where all other versions ex. /recipe/dashboard/{{recipe.label}} & 
/recipe/dashboard/user work. currentUser.username is printed on the page in the same template. 
*/