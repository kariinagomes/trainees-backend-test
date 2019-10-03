const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
}, {
  timestamps: true, //createdAt and updatedAt
});

module.exports = mongoose.model('Artist', ArtistSchema);