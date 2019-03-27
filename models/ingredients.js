var mongoose = require("mongoose");

var IngredientSchema = mongoose.Schema({
  ingredients: [string]
});
var Ingredient = mongoose.model("Ingredient", commentSchema);
module.exports = Ingredient;