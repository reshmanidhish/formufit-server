const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userType: {
      type: String,
      enum: ["admin", "regular"],
    },
    gender: {
      type: String,
      enum: ["female", "male"],
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
      type: mongoose.Schema.Types.Decimal128,
    },
    bodyType: {
      type: String,
      enum: ["Obese", "Normal", "OverWeight", "UnderWeight"],
    },
    lifeStyle: {
      type: String,
    },
    fitnessLevel: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    weight: {
      type: Number,
    },
    goalWeight: {
      type: Number,
    },
    subscriptionPlanId: {
      type: String,
    },
    isPremium: {
      type: Boolean,
    },
    height: {
      type: Number,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
