const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
          },
        image: {
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
    }
)

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
