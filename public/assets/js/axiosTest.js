var Recipe = require("/Users/donni/SimpleKitchenApp/models/recipe");


const axios = require('axios');

async function getGithubData() {
  let res = await
  axios.get("https://api.edamam.com/search?q=chicken&app_id=0abb0580&app_key=bc931d03c51359082244df2fa414c487");
  return (res.data.hits);
};

async function create(array) {
  for (const item of array) {
    await Recipe.create({
      name: item.recipe.label,
      image: item.recipe.image,
      url: item.recipe.url
    }).then(function (results) {
      res.render("recipes")
    })
  }
};

// async function insertSearchedRecipes(resArray) {
//   var rArray = resArray;
//   let response = await create(rArray);
//   return response;
// };

let recipe = getGithubData();

recipe.then(function (result) {
  console.log(result[1].recipe.label);
  var arrayHello = create(result);
  arrayHello.then(function (data) {
    console.log(data);
  })
});


// var arrayHello = insertSearchedRecipes();

// arrayHello.then(function (data) {
//   console.log(data);
// })