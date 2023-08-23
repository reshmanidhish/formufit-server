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
      
    },
    gender: {
      type: String,
      
    },
    answers: {
      type: {},
      
    },
    state: {
      type: String,
      
    },
    country: {
      type: String,
      
    },
    bmi: {
      type: Number,
      
    },
    bodyType: {
      type: String,
      
    },
    lifeStyle: {
      type: Number,
      
    },
    fitnessLevel: {
      type: String,
      
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
