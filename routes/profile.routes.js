const User = require("../models/User.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const { getRandomRecipe, getRandomFitness } = require("./helper/service");

router.post(
  "/upload/:id",
  fileUploader.single("profileImage"),
  (req, res, next) => {
    console.log("file is:", req.file);
    if (!req.file) {
      next(new Error("no photo uploaded!"));
      return;
    }
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.json({ fileUrl: req.file.path });
  }
);

router.put("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const { username, password, city, country, weight, height, profileImage } =
    req.body;

  const updatedForm = {
    username,
    password,
    city,
    country,
    weight,
    height,
    profileImage,
  };

  User.findByIdAndUpdate(userId, updatedForm, { new: true })
    .then((updatedInfo) => {
      if (!updatedInfo) {
        return res.status(404).json({ message: "not found" });
      }
      res.json({ updatedInfo });
    })
    .catch((err) => console.error(err));
});

router.put("/wellness/answers", isAuthenticated, (req, res) => {
  const { _id } = req.payload;
  const { lifestyle, bmi, weight, height, bodyType } = req.body;

  const dataUpdate = { lifestyle, bmi, weight, height, bodyType };

  User.findByIdAndUpdate(_id, dataUpdate, { new: true })
    .then((updatedInfo) => {
      if (!updatedInfo) {
        return res.status(404).json({ message: "not found" });
      }

      res
        .status(200)
        .json({ updatedInfo, message: "Wellness profile succesfully updated" });
    })
    .catch((err) => console.error(err));
});

router.get("/wellness", isAuthenticated, async (req, res) => {
  const { bodyType } = req.payload;
  const breakfastRecipe = await getRandomRecipe(bodyType, "Breakfast");
  const lunchRecipe = await getRandomRecipe(bodyType, "Lunch");
  const dinnerRecipe = await getRandomRecipe(bodyType, "Dinner");
  const workout = await getRandomFitness(bodyType);

  const wellnessDetails = {
    recipe: [breakfastRecipe, lunchRecipe, dinnerRecipe],
    workout
  }
  
  res.status(200).json(wellnessDetails);
});

module.exports = router;
