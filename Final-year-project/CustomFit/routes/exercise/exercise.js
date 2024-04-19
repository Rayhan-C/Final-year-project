const express = require("express");
const router = express.Router();
const Exercise = require('../models/exercise');

router.post('/', async (req, res) => {
  const { name, description, category, demo_links } = req.body;
  const userId = req.session.user._id; // Assuming user is logged in and user ID is stored in the session
  const demoLinksArray = demo_links.split(',').map(link => link.trim());
  try {
    const newExercise = new Exercise({
      name,
      description,
      category,
      demo_links: demoLinksArray,
      user: userId
    });
    await newExercise.save();
    res.redirect('/list-exercises'); // Redirect to list-exercises page after exercise is created
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;