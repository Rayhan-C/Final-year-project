const express = require("express");
const router = express.Router();
const Workout = require('../models/workout');
const moment = require("moment/moment");

// Route to handle the form submission for editing a workout
router.post('/', async (req, res) => {
  const workoutId = req.params.id;
  const {date, exercise_type, no_of_sets, no_of_reps, rest_interval} = req.body;
  const savedDate = moment(date).format('YYYY-MM-DD HH:MM:SS');
  try {
    await Workout.findOneAndUpdate(workoutId, {
      $set: {
        exercise_type: exercise_type,
        no_of_sets: no_of_sets,
        no_of_reps: no_of_reps,
        rest_interval: rest_interval,
        createdAt: savedDate
      }
    });
    res.redirect('/list-workouts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;