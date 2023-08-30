const { Schema, model } = require("mongoose");

const fitnessSchema = new Schema(
    {
        title: {
            type: String,
            required: true
          },
        description: {
            type: String,
            required: true
          },
        videoUrl: {
            type: String,
            required: true
          },  
        bodyType: {
            type: String,
            required: true
          }
    }
)

const Fitness = model("Comment", fitnessSchema);

module.exports = Fitness;
