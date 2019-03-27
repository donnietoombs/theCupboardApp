var mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  url: String,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
});

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;