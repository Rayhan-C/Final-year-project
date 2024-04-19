const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.databaseURL, {
  dbName: 'custom-fit-db'
});
mongoose.connection.on('error',
    console.error.bind(console, 'MongoDB connection Error'));

const Exercise = require('./routes/models/exercise');
const Workout = require('./routes/models/workout');
const CompletedWorkout = require("./routes/models/completedWorkout");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const exerciseRouter = require('./routes/exercise/exercise');
const editExerciseRouter = require('./routes/exercise/edit-exercise');
const workoutRouter = require('./routes/workout/workouts');
const editWorkoutRouter = require('./routes/workout/edit-workout');
const updateMetricsRouter = require('./routes/workout/update-metrics');

// Set up middleware

app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {secret: config.sessionSecret, resave: true, saveUninitialized: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render Routes
app.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', {error, pageTitle: 'Login'});
});

app.get('/signup', (req, res) => {
  const error = req.query.error;
  res.render('signup', {error, pageTitle: 'Register'});
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Profile page route
app.get('/profile', (req, res) => {
  const user = req.session.user;
  res.render('profile', {user, pageTitle: 'Profile'});
});

app.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About Us'});
});

app.get('/contact-us', (req, res) => {
  res.render('contact-us', {pageTitle: 'Contact Us'});
});

app.get('/exercise', (req, res) => {
  res.render('exercise', {pageTitle: 'Exercise'});
});

app.get('/list-exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find({user: req.session.user._id});
    res.render('list-exercises', {exercises, pageTitle: 'List Exercises'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/edit-exercise/:id', async (req, res) => {
  const exerciseId = req.params.id;
  try {
    const exercise = await Exercise.findById(exerciseId);
    res.render('edit-exercise', {exercise, pageTitle: 'Edit Exercise'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle exercise deletion
app.post('/delete-exercise/:id', async (req, res) => {
  const exerciseId = req.params.id;

  try {
    await Exercise.findByIdAndDelete(exerciseId);
    res.redirect('/list-exercises'); // Redirect to the list of exercises after deletion
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/workouts', (req, res) => {
  res.render('workouts', {pageTitle: 'Workouts'});
});

app.get('/list-workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({user: req.session.user._id});
    res.render('list-workouts', {workouts, pageTitle: 'List Workouts'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/edit-workout/:id', async (req, res) => {
  const workoutId = req.params.id;
  try {
    const workout = await Workout.findById(workoutId);
    res.render('edit-workout', {workout, pageTitle: 'Edit Workout'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/update-metrics/:id', async (req, res) => {
  const workoutId = req.params.id;
  try {
    const workout = await Workout.findById(workoutId);
    res.render('update-metrics', {workout, pageTitle: 'Update metrics'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle workout deletion
app.post('/delete-workout/:id', async (req, res) => {
  const workoutId = req.params.id;

  try {
    await Workout.findByIdAndDelete(workoutId);
    res.redirect('/list-workouts'); // Redirect to the list of workouts after deletion
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//
app.get('/progress-track', async (req, res) => {
  try {
    // Retrieve completed workouts from the database
    const completedWorkouts = await CompletedWorkout.find({user: req.session.user._id});

    // Render progress tracking page with completed workouts data
    res.render('progress-track', {pageTitle: 'Progress', completedWorkouts});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/exercise', exerciseRouter);
app.use('/workouts', workoutRouter);
app.use('/edit-exercise/:id', editExerciseRouter);
app.use('/edit-workout/:id', editWorkoutRouter);
app.use('/update-metrics/:id', updateMetricsRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
