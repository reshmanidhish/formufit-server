const express = require('express');
const router = express.Router();

const workouts = []; // Store uploaded workouts here

router.post('/upload', (req, res) => {
  const { name, videoUrl,bodyType } = req.body;
  workouts.push({ name, videoUrl ,bodyType});
  res.status(201).json({ message: 'Workout uploaded successfully' });
});

router.get('/', (req, res) => {
  res.json(workouts);
});

module.exports = router;
