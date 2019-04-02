var mongoose = require("mongoose");

var IngredientSchema = mongoose.Schema({
  name: String,
  inStock: Boolean,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
});
var Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;