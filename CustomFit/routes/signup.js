const express = require('express');
const router = express.Router();

const User = require('./models/user');

// Signup route
router.post('/', async (req, res) => {
  const { username, password, email, confirmPassword} = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.redirect('/signup?error=Passwords%20do%20not%20match');
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect('/signup?error=Email%20already%20exists');
    }

    const newUser = new User({ username, password, email });
    await newUser.save();
    req.session.user = newUser;
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;