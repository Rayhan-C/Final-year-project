const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  demo_links: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
