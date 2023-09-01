const express = require('express');
const router = express.Router();
const Fitness = require('../models/Fitness.model');




router.post('/upload', (req, res) => {
  const { title, videoUrl, bodyType } = req.body;

 
  const newWorkout = new Fitness({ title, videoUrl, bodyType });
  
  
  newWorkout.save()
    .then(() => {
      res.status(201).json({ message: 'Workout uploaded successfully' });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Failed to upload workout' });
    });
});

router.get('/', (req, res) => {

  Fitness.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((error) => {
   
      res.status(500).json({ error: 'Failed to retrieve workouts' });
    });
});

module.exports = router;
