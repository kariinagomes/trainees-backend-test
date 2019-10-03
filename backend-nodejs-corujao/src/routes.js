const express = require('express');

const GenreController = require('./controllers/GenreController');

const routes = express.Router();

// genres
//routes.get('/v1/genres', GenreController.index);
routes.get('/genres', GenreController.listGenres);
routes.post('/genres', GenreController.addGenre);
routes.get('/genres/:genreId', GenreController.getGenre);
routes.put('/genres/:genreId', GenreController.updateGenre);

module.exports = routes;