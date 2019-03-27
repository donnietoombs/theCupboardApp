// Requiring our Todo model
var axios = require("axios");
const request = require('request');
var Recipe = require("../models/recipe");


// Routes
// =============================================================
module.exports = function (app) {

  function addRecipesToDB(objArr) {
    for (var i = 0; i < objArr.length; i++) {
      Recipe.create({
          name: objArr[i].recipe.label,
          image: objArr[i].recipe.image,
          url: objArr[i].recipe.url
        }),
        function (err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log(result);
            res.render("recipe_search_results", {
              data: result
            });
          }
        }
    }
  }


  app.get("/api/recipes/new,", function (req, res) {
    res.render("recipeSearch");
  });


  app.post("/api/recipes/", function (req, res) {
    var searchTerm = req.body.name;

    request.get({
        url: "https://api.edamam.com/search?q=" + searchTerm + "&app_id=0abb0580&app_key=bc931d03c51359082244df2fa414c487"
      },
      function (error, response, body, ) {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body);
          var dataArray = data.hits;
          console.log(data.hits);
          addRecipesToDB(dataArray);
          res.send("Hello")
        }
      }
    );
  });
}



//   app.get("api/getrecipes/:ingredients", function (req, res) {
//   console.log("It Works");
//   if (!req.params.ingredients) {
//   res.status(500);
//   res.send({
//     "Error": "No ID"
//   });
// }
// request.get(
//   // here I am using JSONPlaceholder API (Fake Online REST API for prototyping)
//   {
//     url: "https://api.edamam.com/search?q="+ req.params.ingredients + "&app_id=0abb0580&app_key=bc931d03c51359082244df2fa414c487"
//   },
//   function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // get data from body ... e.g. title
//       const data = JSON.parse(body);
//       console.log(data);
//       res.send(data);
//   //       }
//   //     }
//   //   )
//   // })
// // }
// // // store in Postgresql
// // pg.connect(connectionString, (err, client, done) => {
// //     done();
// //     // Handle connection errors
// //     if(err) {
// //         console.log(err);
// //         return res.status(500).json({success: false, data: err});
// //     }
// //     // SQL Query > Insert Data
// //     client.query('INSERT INTO titles(id, title) values($1, $2)', [req.params.id, title]);

// //     res.json({title: title});
//   })
// };