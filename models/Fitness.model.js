const { Schema, model } = require("mongoose");

const fitnessSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  videoUrl: {
    type: String,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
});

const Fitness = model("Fitness", fitnessSchema);

module.exports = Fitness;
