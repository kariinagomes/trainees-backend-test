const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
}, {
  timestamps: true, //createdAt and updatedAt
});

module.exports = mongoose.model('Genre', GenreSchema);