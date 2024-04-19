const express = require("express");
const router = express.Router();
const CompletedWorkout = require('../models/completedWorkout');
const mongoose = require('mongoose');
const moment = require("moment");

router.post('/', async (req, res) => {
  const {date, duration, caloriesBurned, weightGainedLost} = req.body;
  const workoutId = req.params.id;
  const userId = req.session.user._id;
  const savedDate = moment(date).format('YYYY-MM-DD HH:MM:SS');
  const objectId = new mongoose.Types.ObjectId(workoutId);

  try {
    const newMetric = new CompletedWorkout({
      workout: objectId,
      dateCompleted: savedDate,
      duration: duration,
      caloriesBurned: caloriesBurned,
      weightGainedLost: weightGainedLost,
      user: userId
    });
    await newMetric.save();

    res.redirect('/list-workouts'); // Redirect to the list workouts page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;