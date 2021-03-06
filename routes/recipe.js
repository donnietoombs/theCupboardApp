var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");
const request = require('request');
var Recipe = require("../models/recipe");
var User = require("../models/user");
var Ingredient = require("../models/ingredients")

// Index Route
router.get("/recipes", function (req, res) {
  Recipe.find({}, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      // console.log(results);
      res.render("recipes", {
        recipe: results
      });
    }
  });
});

//New Route
router.get("/recipes/new", function (req, res) {
  res.render("recipe_new")
});

//Create Route
router.post("/recipes", function (req, res) {
  // console.log(req.body.name);
  // console.log(req.body.imageurl);
  // console.log(req.body.url);
  Recipe.create({
      name: req.body.name,
      image: req.body.imageurl,
      url: req.body.url
    },
    function (err, result) {
      if (err) {
        console.log(err)
      } else {
        res.redirect("/recipes")
      }
    }
  );
});

router.get("/:user/recipes/dashboard", function (req, res) {

  Recipe.find({
    'user.username': req.params.user
  }, function (err, recipes) {
    if (err) {
      console.log(err);
      return
    }

    Ingredient.find({
      'user.username': req.params.user
    }, function (err, ingredients) {
      if (err) {
        console.log(err);
        return
      }
      console.log(recipes);
      console.log(ingredients);
      res.render('recipeDashboard', {
        recipe: recipes,
        ingredient: ingredients

      });
    })
  });

  // console.log(req.params.user);
  // Ingredients.find({
  //   'user.username': req.params.user
  // })

  // Recipe.find({
  //     'user.username': req.params.user
  //   },
  //   function (err, results) {
  //     if (err) {
  //       console.log('There was an error');
  //     } else {
  //       // console.log(results)
  //       // when passing into ejs, handlebars etc the object key is the name on the
  //       // other side and the value is the data you want to pass (from the db usually).
  //       res.render('recipeDashboard', {
  //         recipe: results
  //       });
  //     }
  //   });
});


//Create Route
router.post("/recipes/dashboard", function (req, res) {
  const user = {
    id: req.user.id,
    username: req.user.username
  };

  // console.log(req.body.recIngredients);
  var ingArray = [];
  // console.log(req.body.recIngredients[0].text)
  var iData = JSON.parse(req.body.recIngredients);
  // console.log(iData);

  iData.forEach(function (item) {
    ingArray.push(item.text);
    Ingredient.create({
      name: item.text,
      inStock: true,
      user: user
      // }, function (err, ingResult) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(ingResult);
      //   }
    })
  });


  // console.log(ingArray);

  // console.log(req.body.recIngredients);
  Recipe.create({
      name: req.body.recName,
      image: req.body.recImage,
      url: req.body.recUrl,
      ingredients: ingArray,
      user: user
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        var message = {
          message: "Added to Dashboard"
        }
        res.send(message);
      }
    }
  );
});

// SHOW ROUTE
// router.get("recipes/:id", function (req, res) {
//   Recipe.find({req.params.id}, function (err, results) {
//     if (err) {
//       console.log(err)
//     } else {
//       res.render("recipes", {
//         recipes: results,
//         currentUser: req.user
//       })
//     }
//   });
// });

// =============================
// Save Searched Recipes to user Dashboard
// =============================

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


// +++++++++++++++++
// API ROUTES
// +++++++++++++++++

function addRecipesToDB(objArr) {
  for (var i = 0; i < objArr.length; i++) {
    Recipe.create({
      name: objArr[i].recipe.label,
      image: objArr[i].recipe.image,
      url: objArr[i].recipe.url
    })
    //   function (err, result) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       res.redirect("/recipes")
    //     }
    //   }
    // );
  }
}


router.get("/api/recipes/new", function (req, res) {
  res.render("recipeSearch");
});


router.post("/api/recipes/", function (req, res) {
  var searchTerm = req.body.name;

  request.get({
      url: "https://api.edamam.com/search?q=" + searchTerm + "&app_id=0abb0580&app_key=bc931d03c51359082244df2fa414c487&from=0&to=24"
    },
    function (error, response, body, ) {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        var dataArray = data.hits;
        // console.log(data.hits[0].recipe.ingredients[0].text)
        // console.log(dataArray[0].recipe.ingredients);
        var ingredientsList = (dataArray[0].recipe.ingredients);
        res.render("recipeResults", {
          data: dataArray,
          // ingredients: ingredientsList
        });
      }
    }
  );
});

module.exports = router;