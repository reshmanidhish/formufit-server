const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
          },
        recipeImage: {
            type: String,
            required: true
          },
        ingredients: {
            type: String,
            required: true
          },
        instructions: {
            type: String,
            required: true
          },
        bodyType: {
            type: String,
            required: true
          },
        adminId: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
    }
)

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
