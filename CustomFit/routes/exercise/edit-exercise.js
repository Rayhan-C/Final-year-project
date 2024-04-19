const express = require("express");
const router = express.Router();
const Exercise = require('../models/exercise');

// Route to handle the form submission for editing an exercise
router.post('/', async (req, res) => {
  const exerciseId = req.params.id;
  const {name, description, category, demo_links} = req.body;

  try {
    await Exercise.findOneAndUpdate(exerciseId, {
      $set: {
        name: name,
        description: description,
        category: category,
        demo_links: demo_links.split(',').map(link => link.trim())
      }
    });
    res.redirect('/list-exercises');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;