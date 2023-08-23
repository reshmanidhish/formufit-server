const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    userType: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    answers: {
      type: {},
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    bmi: {
      type: Number,
      required: true
    },
    bodyType: {
      type: String,
      required: true
    },
    lifeStyle: {
      type: Number,
      required: true
    },
    fitnessLevel: {
      type: Number,
      required: true
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
