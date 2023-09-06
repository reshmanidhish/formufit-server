const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ratingSchema = new Schema( {
    recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe", 
    },
    user: {
            type: Schema.Types.ObjectId,
            ref: "User",
    },
    rating: {
        type: Number, 
        min:1,
        max:5,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
