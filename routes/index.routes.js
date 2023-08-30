const router = require("express").Router();
const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
