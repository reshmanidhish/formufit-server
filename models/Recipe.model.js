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
        ingredients: [{
            type: String,
            required: true
          }],
        instructions: {
            type: String,
            required: true
          },
        bodyType: {
            type: String,
            enum:["Obese","Normal","OverWeight","UnderWeight"]
          },
        mealType: {
          type: String,
          enum:["Breakfast","Dinner","Lunch"]
        },
        cookingTime: {
          type: Number,
          required: true
        },
        ratings: [
          {
            type: Schema.Types.ObjectId,
            ref: "Rating",
          }
        ]
        //adminId: {
         //type: Schema.Types.ObjectId,
         //ref: "User"
       // }
    }
)

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
