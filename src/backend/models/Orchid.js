const mongoose = require('mongoose');

const orchidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  isSpecial: { type: Boolean, default: false },
  image: { type: String, required: true },
  color: { type: String, required: true },
  origin: { type: String, required: true },
  category: { type: String, required: true },
  clip: { type: String },
  feedback: [{
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
  }],
});

const Orchid = mongoose.model('Orchid', orchidSchema);

module.exports = Orchid; 