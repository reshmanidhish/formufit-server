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
      enum: ["admin", "regular"]
    },
    gender: {
      type: String,
      enum: ["female", "male"]
    },
    answers: {
      type: {},
      
    },
    city: {
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
      enum:["obese","normal","OverWeight","underWeight"]
      
    },
    lifeStyle: {
      type: Number,
      
    },
    fitnessLevel: {
      type: String,
      
    },
    profileImage: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
