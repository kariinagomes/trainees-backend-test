const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  description: String,
}, {
  timestamps: true, //createdAt and updatedAt
});

module.exports = mongoose.model('Genre', GenreSchema);