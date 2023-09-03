const express = require("express");
const router = express.Router();
const Fitness = require("../models/Fitness.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.post("/upload", (req, res) => {
  const { title, videoUrl, bodyType } = req.body;
  const newWorkout = new Fitness({ title, videoUrl, bodyType });

  newWorkout
    .save()
    .then(() => {
      res.status(201).json({ message: "Workout uploaded successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to upload workout" });
    });
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { bodyType, ut } = req.payload;
    const requestPayload = ut === 1 ? {} : { bodyType };

    const workouts = await Fitness.find(requestPayload);
    res.status(200).json(workouts);
  } catch (error) {
    console.log("error fetching workouts", error);
    res.status(500).json({ error: "Error fetching workouts" });
  }
});

module.exports = router;
