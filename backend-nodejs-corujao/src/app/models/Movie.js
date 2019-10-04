const mongoose = require('mongoose');

/**
 * Foi utilizado o tipo mongoose.Schema.Types.ObjectId ao 
 * invés de Object para que popule corretamente os valores
 * conforme _id, assim é possível retornar da mesma forma
 * que é apresentado no exemplo do swagger.
 */
const MovieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  genres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }]
}, {
  timestamps: true, //createdAt and updatedAt
});

module.exports = mongoose.model('Movie', MovieSchema);