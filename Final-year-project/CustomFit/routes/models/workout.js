const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercise_type: {type: String, required: true},
  no_of_sets: {type: Number, required: true},
  no_of_reps: {type: Number, required: true},
  rest_interval: {type: Number, required: true},
  createdAt: {
    type: String,
    // default: Date.now // Set the default value to the current datetime
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
