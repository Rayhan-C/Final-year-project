const mongoose = require('mongoose');

const completedWorkoutSchema = new mongoose.Schema({
  workout: {type: mongoose.Schema.Types.ObjectId, ref: 'Workout'},
  dateCompleted: {type: String},
  duration: Number,
  caloriesBurned: Number,
  weightGainedLost: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const CompletedWorkout = mongoose.model('CompletedWorkout',
    completedWorkoutSchema);

module.exports = CompletedWorkout;
