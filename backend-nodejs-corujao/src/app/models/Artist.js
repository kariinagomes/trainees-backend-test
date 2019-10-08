const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  dateOfBirth: Date,
}, {
  timestamps: true, //createdAt and updatedAt
});

module.exports = mongoose.model('Artist', ArtistSchema);