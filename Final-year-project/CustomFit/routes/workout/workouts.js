const express = require("express");
const router = express.Router();
const Workout = require('../models/workout');
const moment = require("moment");

// Route to handle creation of workout
router.post('/', async (req, res) => {
  const {date, exercise_type, no_of_sets, no_of_reps, rest_interval} = req.body;
  const userId = req.session.user._id; // Assuming user is logged in and user ID is stored in the session
   const savedDate = moment(date).format('YYYY-MM-DD HH:MM:SS');
  try {
    const newWorkout = new Workout({
      exercise_type,
      no_of_sets,
      no_of_reps,
      rest_interval,
      createdAt: savedDate,
      user: userId
    });
    await newWorkout.save();
    res.redirect('/list-workouts'); // Redirect to list-workouts page after workout is created
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;