const express = require('express');
const  bcrypt = require('bcrypt')
const router = express.Router();

const User = require('./models/user');

/* Login */
router.post('/', async  (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.redirect('/login?error=Invalid%20email%20or%20password');
    }

    req.session.user = user; // Store user data in session
    res.redirect('/list-exercises'); // Redirect to list-exercises after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
